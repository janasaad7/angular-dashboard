import { Component } from '@angular/core';
import { KanbanComponent } from '../../components/kanban/kanban';

@Component({
  selector: 'app-tasks',
  imports: [KanbanComponent],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class TasksComponent {
  openAddTaskDialog(): void {

  }
}
