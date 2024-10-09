import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Login1Component } from './header/login1/login1.component';
import { Login2Component } from './header/login2/login2.component';
import { Login3Component } from './header/login3/login3.component';
import { Login0Component } from './header/login0/login0.component';
import { BodyComponent } from './body/body.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { AppComponent } from './app.component';
import { CambioPassComponent } from './usuarios/cambio-pass/cambio-pass.component';
import { CambioPass3Component } from './usuarios/cambio-pass3/cambio-pass3.component';
import { loginGuard } from './guards/login.guard';
import { registerGuard } from './guards/register.guard';
import { notExitGuard } from './guards/not-exit.guard';
import { notLoginGuard } from './guards/notLogin.guard';
import { DashboardComponent } from './header/dashboard/dashboard.component';
import { HomedashComponent } from './header/homedash/homedash.component';


export const routes: Routes = [
  { path: 'inicio', component : AppComponent }, 
  { path: 'header', component: HeaderComponent }, 
  { path: 'login1', component: Login1Component, canActivate: [notLoginGuard] }, 
  { path: 'login2', component: Login2Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard] }, // Eliminado loginGuard
  { path: 'login3', component: Login3Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard] }, // Eliminado registerGuard y loginGuard
  { path: 'login0', component: Login0Component, canActivate: [notLoginGuard] }, 
  { path:'perfil', component: PerfilComponent, canActivate: [loginGuard] },
  { path:'resetPswd', component: CambioPassComponent }, 
  { path:'resetPswd3/:tokenPswd', component: CambioPass3Component }, 
  { path: 'body', component: BodyComponent },
  { path: 'dashboard', component: DashboardComponent },

  /*{ path: '**', redirectTo: '/inicio' }*/ // Ruta comodín para redireccionar a inicio
];
