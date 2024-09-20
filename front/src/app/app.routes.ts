import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Login1Component } from './header/login1/login1.component';
import { Login2Component } from './header/login2/login2.component';
import { Login3Component } from './header/login3/login3.component';
import { Login0Component } from './header/login0/login0.component';
import { BodyComponent } from './body/body.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';  // Importar el módulo para la barra de herramientas
import { MatButtonModule } from '@angular/material/button';    // Importar el módulo para los botones
import { AppComponent } from './app.component';
import { CambioPassComponent } from './usuarios/cambio-pass/cambio-pass.component';
import { CambioPass2Component } from './usuarios/cambio-pass2/cambio-pass2.component';
import { CambioPass3Component } from './usuarios/cambio-pass3/cambio-pass3.component';


export const routes: Routes = [
    { path: 'inicio', component : AppComponent }, // Ruta principal que carga el Header
    { path: 'header', component: HeaderComponent }, // Ruta para el componente Login1
    { path: 'login1', component: Login1Component }, // Ruta para el componente Login2
    { path: 'login2', component: Login2Component }, // Ruta para el componente Login2
    { path: 'login3', component: Login3Component }, // Ruta para el component Login3
    { path: 'login0', component: Login0Component }, // Ruta para el component Login0
   
    {path:'perfil', component:PerfilComponent},// Ruta para el componente perfil
    { path:'resetPswd', component: CambioPassComponent }, // Ruta para el component cambioPass
    { path:'resetPswd2', component: CambioPass2Component }, // Ruta para el component  cambioPass2
    { path:'resetPswd3', component: CambioPass3Component }, // Ruta para el component  cambioPass3
    {path: 'body',component:BodyComponent},
    // { path: '**', redirectTo: '/inicio' } //redirige por defecto al login1
  ];




 