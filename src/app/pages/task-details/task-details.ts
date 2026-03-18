import { Component, inject, computed, ChangeDetectionStrategy, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog';

import { PRIORITY_LABELS, STATUS_LABELS } from '../../models/task';
import { IConfirmDialogData } from '../../models/confirm-dialog-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent {
  id = input.required<string>();

  #taskService = inject(TaskService);
  #router = inject(Router);
  dialog = inject(MatDialog);

  priorityLabels = PRIORITY_LABELS;
  statusLabels = STATUS_LABELS;

  task = computed(() => this.#taskService.getTaskById(this.id()));

  getPriorityClasses(priority: string): string {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'low':
        return 'bg-green-500/10 text-green-400';
      default:
        return '';
    }
  }

  getStatusClasses(status: string): string {
    switch (status) {
      case 'todo':
        return 'bg-sky-300/50 text-blue-400';
      case 'in_progress':
        return 'bg-yellow-200/50 text-yellow-400';
      case 'done':
        return 'bg-emerald-200/50 text-green-400';
      default:
        return '';
    }
  }

  openDeleteConfirmationDialog(taskId: string): void {
    const data: IConfirmDialogData = {
      icon: 'icons/trash.svg',
      title: 'Delete Task',
      message: 'Are you sure you want to delete this task? This action cannot be undone.',
      confirmLabel: 'Yes, Delete',
      cancelLabel: 'No, Cancel',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#taskService.deleteTask(taskId);
      }
    });
  }
}
