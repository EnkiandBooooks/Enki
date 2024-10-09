import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Register1Component } from './header/register/register1/register1.component';
import { Register2Component } from './header/register/register2/register2.component';
import { Register3Component } from './header/register/register3/register3.component';
import { Register0Component } from './header/register/register0/register0.component';
import { BodyComponent } from './body/body.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPswd1Component } from './usuarios/reset-pswd/reset-pswd1/reset-pswd1.component';
import { ResetPswd2Component } from './usuarios/reset-pswd/reset-pswd2/reset-pswd2.component';
import { loginGuard } from './guards/login.guard';
import { registerGuard } from './guards/register.guard';
import { notExitGuard } from './guards/not-exit.guard';
import { notLoginGuard } from './guards/notLogin.guard';
import { DashboardComponent } from './header/dashboard/dashboard.component';
import { HomedashComponent } from './header/homedash/homedash.component';
import { PolicyComponent } from './footer/policy/policy.component';


export const routes: Routes = [
  { path: 'inicio', component : AppComponent }, 
  { path: 'header', component: HeaderComponent }, 
  { path: 'register1', component: Register1Component, canActivate: [notLoginGuard] }, 
  { path: 'register2', component: Register2Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard] }, // Eliminado loginGuard
  { path: 'register3', component: Register3Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard] }, // Eliminado registerGuard y loginGuard
  { path: 'register0', component: Register0Component, canActivate: [notLoginGuard] }, 
  { path:'perfil', component: PerfilComponent, canActivate: [loginGuard] },
  { path:'resetPswd1', component: ResetPswd1Component }, 
  { path:'resetPswd2/:tokenPswd', component: ResetPswd2Component }, 
  { path: 'body', component: BodyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'footer', component:FooterComponent},
  { path: 'policy', component:PolicyComponent}

  /*{ path: '**', redirectTo: '/inicio' }*/ // Ruta comodín para redireccionar a inicio
];
