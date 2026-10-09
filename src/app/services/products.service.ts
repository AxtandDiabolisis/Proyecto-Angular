import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-url';

export interface Product {
  id: number;
  name: string;
  category: string;
  line: string;
  image?: string;
  icon?: string;
  description?: string;
  price?: string | null;
  whatsapp_message?: string;
}

export interface Category {
  name: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = API_BASE_URL + '/products';

  constructor(private http: HttpClient) {}

  getProducts(line?: string, category?: string): Observable<Product[]> {
    let params = new HttpParams();

    if (line) {
      params = params.set('line', line);
    }

    if (category && category !== 'Todos') {
      params = params.set('category', category);
    }

    return this.http.get<Product[]>(`${this.apiUrl}/`, { params });
  }

  getCategories(line?: string): Observable<Category[]> {
    let params = new HttpParams();

    if (line) {
      params = params.set('line', line);
    }

    return this.http.get<Category[]>(`${this.apiUrl}/categories`, { params });
  }

  updateProduct(id: number, changes: Pick<Product, 'name' | 'description' | 'image' | 'price'>): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, changes);
  }
}
