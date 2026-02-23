import { Component, inject, signal } from '@angular/core';
import { LeadReport } from '../../core/models/report.model';
import { ReportService } from '../../core/services/report.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {

private reportService = inject(ReportService);

 report = signal<LeadReport | null>(null);


  

  ngOnInit(): void {
    this.reportService.getReport()
    .subscribe(res => {
       this.report.set(res.data);
    });
  }

}
