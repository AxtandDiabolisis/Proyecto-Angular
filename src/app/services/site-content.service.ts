import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-url';

export interface SiteContentResponse<T> {
  key: string;
  value: T | null;
  updated_at: string | null;
}

@Injectable({ providedIn: 'root' })
export class SiteContentService {
  private readonly apiUrl = API_BASE_URL + '/content';

  constructor(private readonly http: HttpClient) {}

  get<T>(key: string): Observable<SiteContentResponse<T>> {
    return this.http.get<SiteContentResponse<T>>(this.apiUrl + '/' + key);
  }

  save<T>(key: string, value: T): Observable<SiteContentResponse<T>> {
    return this.http.put<SiteContentResponse<T>>(this.apiUrl + '/' + key, { value });
  }

  uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        const comma = dataUrl.indexOf(',');
        if (comma < 0) {
          reject(new Error('El archivo de imagen no es valido.'));
          return;
        }
        this.http.post<{ image_url: string }>(this.apiUrl + '/upload-image', {
          content_type: file.type,
          data_base64: dataUrl.slice(comma + 1)
        }).subscribe({ next: (result) => resolve(result.image_url), error: reject });
      };
      reader.readAsDataURL(file);
    });
  }
}
