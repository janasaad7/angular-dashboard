import { defaults } from 'chart.js';

export function configureCharts(): void {
  defaults.font.family = 'Inter, sans-serif';
  defaults.font.size = 12;
  defaults.color = '#6b7280';
  defaults.plugins.tooltip = {
    ...defaults.plugins.tooltip,
    backgroundColor: '#1f2937',
    titleColor: '#f9fafb',
    bodyColor: '#d1d5db',
    padding: 12,
    cornerRadius: 8,
  };
}
