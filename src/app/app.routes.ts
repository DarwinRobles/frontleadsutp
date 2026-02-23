import { Routes } from '@angular/router';
import { Leads } from './features/leads/leads';
import { Reports } from './features/reports/reports';

export const routes: Routes = [
    {
        path: '',
        component: Leads
    },
    {
        path: 'reports',
        component: Reports
    },
    {
        path: '**',
        redirectTo: ''
    }
];
