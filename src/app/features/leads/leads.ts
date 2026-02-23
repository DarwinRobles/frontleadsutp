import { Component, inject, signal } from '@angular/core';
import { LeadService } from '../../core/services/lead.service';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-leads',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './leads.html',
  styleUrl: './leads.css',
})
export class Leads {

  private leadService = inject(LeadService);
  private fb = inject(FormBuilder);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  loading = signal(false);


  form = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    trackingUTM: ['']
  });

  submit() {

  if (this.form.invalid) return;

  this.loading.set(true);
  this.successMessage.set(null);
  this.errorMessage.set(null);

  let formValue = this.form.value;

  if (!formValue.trackingUTM) {
    formValue.trackingUTM = this.generateRandomUTM();
  }

  this.leadService.createLead(formValue as any)
    .subscribe({
      next: (res) => {
        this.loading.set(false);

        if (res.success) {
          this.successMessage.set('Lead enviado correctamente');
          this.form.reset();

          setTimeout(() => {
            this.successMessage.set(null);
          }, 3000);
        } else {
          this.errorMessage.set(res.message);
        }
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Ingres de manera correcta los datos');
      }
    });
}

  private generateRandomUTM(): string {
    const sources = ['facebook', 'google', 'instagram'];
    const mediums = ['cpc', 'organic', 'social'];

    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const randomMedium = mediums[Math.floor(Math.random() * mediums.length)];

    return `utm_source=${randomSource}&utm_medium=${randomMedium}&utm_campaign=auto_generated`;
  }


}
