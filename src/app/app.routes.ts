import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard')
      .then(m => m.DashboardComponent),
    data: { label: 'Dashboard', icon: 'icons/dashboard.svg' }
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks')
      .then(m => m.TasksComponent),
    data: { label: 'Tasks', icon: 'icons/tasks.svg' }
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./pages/task-details/task-details')
      .then(m => m.TaskDetailsComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found')
      .then(m => m.NotFoundComponent),
  }
];
