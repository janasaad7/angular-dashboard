import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard')
      .then(m => m.DashboardComponent),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks')
      .then(m => m.TasksComponent),
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./components/task-detail/task-detail')
      .then(m => m.TaskDetailComponent),
  },
];
