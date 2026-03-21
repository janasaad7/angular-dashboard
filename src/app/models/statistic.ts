export interface IStatistic {
  id: string;
  title: string;
  icon: string;
  change: string;
  changeLabel: string;
  changeType: 'positive' | 'negative';
  color: string;
}
