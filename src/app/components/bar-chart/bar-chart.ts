import {
  Component, inject, OnDestroy, ElementRef,
  viewChild, afterNextRender, afterRenderEffect,
  ChangeDetectionStrategy
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TaskService } from '../../services/task';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  imports: [],
  standalone: true,
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnDestroy {
  canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  #taskService = inject(TaskService);
  #chart?: Chart;

  constructor() {
    afterNextRender(() => this.#init());

    afterRenderEffect(() => {
      const byDay = this.#taskService.tasksByDay();
      this.#update(byDay);
    });
  }

  #init(): void {
    const byDay = this.#taskService.tasksByDay();
    this.#chart = new Chart(this.canvasRef().nativeElement, {
      type: 'bar',
      data: {
        labels: Array.from(byDay.keys()),
        datasets: [{
          label: 'Tasks Created',
          data: Array.from(byDay.values()),
          backgroundColor: '#6366f1cc',
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 400,
        },
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: { color: '#f3f4f6' },
          }
        }
      }
    });
  }

  #update(byDay: Map<string, number>): void {
    if (!this.#chart) return;
    this.#chart.data.labels = Array.from(byDay.keys());
    this.#chart.data.datasets[0].data = Array.from(byDay.values());
    this.#chart.update('active');
  }

  ngOnDestroy(): void {
    this.#chart?.destroy();
  }
}
