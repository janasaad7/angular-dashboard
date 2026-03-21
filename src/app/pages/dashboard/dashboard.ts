import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task';
import { WidgetComponent } from '../../components/widget/widget';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  #taskService = inject(TaskService);
  statistics = this.#taskService.statistics;

  getStatValue(statId: string): number {
    switch (statId) {
      case 'stat-001':
        return this.#taskService.taskStats().total;
      case 'stat-002':
        return this.#taskService.taskStats().done;
      case 'stat-003':
        return this.#taskService.taskStats().inProgress;
      case 'stat-004':
        return this.#taskService.taskStats().overdue;
      default:
        return 0;
    }
  }
}
