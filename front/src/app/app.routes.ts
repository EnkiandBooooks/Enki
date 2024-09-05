import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Login1Component } from './header/login1/login1.component';
import { Login2Component } from './header/login2/login2.component';
import { Login3Component } from './header/login3/login3.component';
import { BodyComponent } from './body/body.component';
import { PerfilComponent } from './usuarios/perfil/perfil.component';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';  // Importar el módulo para la barra de herramientas
import { MatButtonModule } from '@angular/material/button';    // Importar el módulo para los botones
import { AppComponent } from './app.component';


export const routes: Routes = [
    { path: 'inicio', component : AppComponent }, // Ruta principal que carga el Header
    { path: 'header', component: HeaderComponent }, // Ruta para el componente Login1
    { path: 'login1', component: Login1Component }, // Ruta para el componente Login2
    { path: 'login2', component: Login2Component }, // Ruta para el componente Login2
    { path: 'login3', component: Login3Component }, // Ruta para el component Login3
    {path:'perfil', component:PerfilComponent},// Ruta para el componente perfil
    {path: 'body',component:BodyComponent},
    // { path: '**', redirectTo: '/inicio' } //redirige por defecto al login1
  ];




 