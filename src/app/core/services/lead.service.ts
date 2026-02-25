import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeadModel, ApiResponse } from '../models/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  constructor(private http: HttpClient) { }

  getLeads(): Observable<ApiResponse<LeadModel[]>> {
    return this.http.get<ApiResponse<LeadModel[]>>(`${environment.apiUrl}/api/leads/all`);
  }

  getLead(id: string): Observable<ApiResponse<LeadModel>> {
    return this.http.get<ApiResponse<LeadModel>>(`${environment.apiUrl}/api/leads/${id}`);
  }

  createLead(lead: LeadModel): Observable<ApiResponse<LeadModel>> {
    return this.http.post<ApiResponse<LeadModel>>(`${environment.apiUrl}/api/leads/crear`, lead);
  }

  updateLead(id: string, estado: string): Observable<ApiResponse<LeadModel>> {
    return this.http.put<ApiResponse<LeadModel>>(`${environment.apiUrl}/api/leads/update/${id}`, { estado });
  }

  deleteLead(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/leads/delete/${id}`);
  }
}