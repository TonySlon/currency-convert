import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: '', redirectTo: 'currency-convert', pathMatch: 'full' },
      { path: 'currency-convert', component: AppComponent }
    ]),]
})
  .catch((err) => console.error(err));
