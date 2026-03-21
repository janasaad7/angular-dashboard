import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IStatistic } from '../../models/statistic';

@Component({
  selector: 'app-widget',
  imports: [],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent {
  stat = input.required<IStatistic>();
  value = input.required<number>();
}
