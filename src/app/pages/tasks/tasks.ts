import { Component, inject } from '@angular/core';
import { KanbanComponent } from '../../components/kanban/kanban';
import { ITaskDialogData } from '../../models/task-dialog-data';
import { TaskService } from '../../services/task';
import { TaskFormDialogComponent } from '../../components/task-form-dialog/task-form-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tasks',
  imports: [KanbanComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class TasksComponent {
  #taskService = inject(TaskService);
  dialog = inject(MatDialog);

  openAddTaskDialog(): void {
    const data: ITaskDialogData = {
      task: null,
      users: this.#taskService.users(),
    };

    const dialogRef = this.dialog.open(TaskFormDialogComponent, {
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.#taskService.addTask(result);
      }
    });
  }
}
