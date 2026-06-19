import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private readonly apiUrl = 'http://127.0.0.1:8000/contact';

  constructor(private http: HttpClient) {}

  sendContactMessage(contact: ContactData): Observable<{ message: string; contact_id: number }> {
    return this.http.post<{ message: string; contact_id: number }>(
      `${this.apiUrl}/`,
      contact
    );
  }
}