export interface LeadReport {
  totalLeads: number;
  leadsByEstado: Record<string, number>;
  leadsByDate: Record<string, number>;
  leadsByUtmSource: Record<string, number>;
}
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}