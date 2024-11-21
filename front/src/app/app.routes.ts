import { Routes } from '@angular/router';
import { AppComponent } from './app.component';


export const routes: Routes = [
  { path: 'inicio', component : AppComponent },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then(m=>m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.routes').then(m=>m.DASHBOARD_ROUTES),
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.routes').then(m=>m.SHARED_ROUTES),
  },
  /*{ path: '**', redirectTo: '/inicio' }*/ // Ruta comodín para redireccionar a inicio
];
