import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';
import { ITask, PRIORITY_LABELS, STATUS_COLORS, STATUS_LABELS, TTaskStatus } from '../../models/task';
import {
  DragDropModule,
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  CdkDragHandle, CdkDragPlaceholder
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { IConfirmDialogData } from '../../models/confirm-dialog-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kanban',
  imports: [CdkDropList, CdkDrag, DragDropModule, CdkDragHandle, CdkDragPlaceholder, RouterLink],
  templateUrl: './kanban.html',
  styleUrl: './kanban.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanComponent {
  #taskService = inject(TaskService);
  dialog = inject(MatDialog);

  columns: { status: TTaskStatus; label: string; color: string }[] = [
    { status: 'todo', label: STATUS_LABELS['todo'], color: STATUS_COLORS['todo'] },
    {
      status: 'in_progress', label: STATUS_LABELS['in_progress'], color: STATUS_COLORS['in_progress'],
    },
    { status: 'done', label: STATUS_LABELS['done'], color: STATUS_COLORS['done'] },
  ];

  priorityLabels = PRIORITY_LABELS;

  getTasksForStatus(status: TTaskStatus): ITask[] {
    switch (status) {
      case 'todo':
        return this.#taskService.todoTasks();
      case 'in_progress':
        return this.#taskService.inProgressTasks();
      case 'done':
        return this.#taskService.doneTasks();
    }
  }

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

  drop(event: CdkDragDrop<ITask[]>, targetStatus: TTaskStatus): void {
    if (event.previousContainer === event.container) {
      const tasks = [...event.container.data];
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      this.#taskService.reorderTasks(targetStatus, tasks);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.#taskService.moveTask(task.id, targetStatus, event.currentIndex);
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
