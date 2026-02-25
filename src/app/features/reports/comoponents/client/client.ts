import { Component, computed, inject, signal } from '@angular/core';
import { ApiResponse, LeadModel } from '../../../../core/models/lead.model';
import { LeadService } from '../../../../core/services/lead.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [CommonModule],
  templateUrl: './client.html',
  styleUrl: './client.css',
})
export class Client {

  private clientService = inject(LeadService);

  clients = signal<LeadModel[]>([])
  currentPage = signal(1);
  pageSize = 5;

  estados = [
    'NUEVO',
    'CONTACTADO',
    'CALIFICADO',
    'EN_PROCESO',
    'CONVERTIDO',
    'DESCARTADO'
  ];

  totalPages = computed(() =>
    Math.ceil(this.clients().length / this.pageSize)
  );

  paginatedClients = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.clients().slice(start, start + this.pageSize);
  });

  ngOnInit(): void {
  this.clientService.getLeads()
    .subscribe(res => {
      if (res.success) {
        this.clients.set(res.data);
      }
    });
}

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(v => v + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(v => v - 1);
    }
  }

  updateEstado(lead: LeadModel, nuevoEstado: string) {

  if (!lead.id) return;

  this.clientService
    .updateLead(lead.id, nuevoEstado)
    .subscribe(res => {

      if (res.success) {
        this.clients.update(leads =>
          leads.map(l =>
            l.id === lead.id
              ? res.data
              : l
          )
        );

      }
    });
}

}
