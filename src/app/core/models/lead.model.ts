export interface LeadModel {
  id?: string;
  name: string;
  phone: string;
  email: string;
  estado?: string;
  trackingUTM: string;
  fechaCreacion?: string;
}
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}