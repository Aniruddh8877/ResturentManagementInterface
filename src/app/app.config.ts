import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch} from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {

 providers:[provideHttpClient(withFetch()),provideClientHydration(),provideAnimationsAsync(),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]    
};
