import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, LeadReport } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReport(): Observable<ApiResponse<LeadReport>> {
    return this.http.get<ApiResponse<LeadReport>>(`${environment.apiUrl}/api/leads/report`);
  }

  getReportByDate(date: string): Observable<ApiResponse<LeadReport>> {
    return this.http.get<ApiResponse<LeadReport>>(`${environment.apiUrl}/api/leads/report/${date}`);
  }
}