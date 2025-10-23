import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';

import {
  provideRouter,
  withViewTransitions,
  withInMemoryScrolling,
  withRouterConfig
} from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { Home } from './components/home/home';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withViewTransitions(), // optional: adds smooth view transitions
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
    ),

    provideClientHydration(withEventReplay())
  ]
};
