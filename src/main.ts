import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { configureCharts } from './app/config/chart.config';

configureCharts();

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
