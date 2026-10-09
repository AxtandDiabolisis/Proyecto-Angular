import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-url';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  source_page?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = API_BASE_URL + '/contact';

  constructor(private http: HttpClient) {}

  sendContactMessage(contact: ContactData): Observable<{ message: string; contact_id: number }> {
    return this.http.post<{ message: string; contact_id: number }>(
      `${this.apiUrl}/`,
      contact
    );
  }
}
