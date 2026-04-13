import {
  Component, inject, OnDestroy, ElementRef,
  viewChild, afterNextRender, afterRenderEffect,
  ChangeDetectionStrategy
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskService } from '../../services/task';

Chart.register(...registerables);

@Component({
  selector: 'app-doughnut-chart',
  imports: [],
  standalone: true,
  templateUrl: './doughnut-chart.html',
  styleUrl: './doughnut-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoughnutChartComponent implements OnDestroy {
  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  #taskService = inject(TaskService);
  #chart?: Chart;

  constructor() {
    afterNextRender(() => this.#init());

    afterRenderEffect(() => {
      const stats = this.#taskService.taskStats();
      this.#update(stats);
    });
  }

  #init(): void {
    const stats = this.#taskService.taskStats();
    this.#chart = new Chart(this.canvasRef().nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Todo', 'In Progress', 'Done'],
        datasets: [{
          data: [stats.todo, stats.inProgress, stats.done],
          backgroundColor: ['#6366f1', '#f59e0b', '#10b981'],
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        animation: {
          duration: 400,
        },
      }
    });
  }

  #update(stats: { todo: number; inProgress: number; done: number }): void {
    if (!this.#chart) return;
    this.#chart.data.datasets[0].data = [stats.todo, stats.inProgress, stats.done];
    this.#chart.update('active');
  }

  ngOnDestroy(): void {
    this.#chart?.destroy();
  }
}
