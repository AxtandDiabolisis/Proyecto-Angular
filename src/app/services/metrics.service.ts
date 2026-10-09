import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-url';

export interface MetricData {
  product_id: number;
  product_name: string;
  line: string;
  action: string;
}

export interface MetricSummary {
  totalClicks: number;
  totalWhatsapp: number;
  records: MetricRecord[];
}

export interface MetricRecord {
  id: number;
  productName: string;
  line: string;
  action: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private readonly apiUrl = API_BASE_URL + '/metrics';

  constructor(private http: HttpClient) {}

  trackMetric(metric: MetricData): Observable<{ message: string; metric_id: number }> {
    return this.http.post<{ message: string; metric_id: number }>(
      `${this.apiUrl}/track`,
      metric
    );
  }

  getSummary(): Observable<MetricSummary> {
    return this.http.get<MetricSummary>(`${this.apiUrl}/summary`);
  }
}
