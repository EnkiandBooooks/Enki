import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';  
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormsModule,
    BodyComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent{
  title = 'enkiweb';
  showHeaderAndBodyAndFooter: boolean = true; // Nueva variable para controlar la visibilidad

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('Ruta actual:', event.url); // Agrega esta línea para verificar la URL actual

      // Ocultar header y body en rutas específicas o que empiezan con /resetPswd2
      this.showHeaderAndBodyAndFooter = ![
        '/register0',     // Ruta para el registro inicial
        '/register1',     // Ruta de registro paso 1
        '/register2',     // Ruta de registro paso 2
        '/register3',     // Ruta de registro paso 3
        '/dashboard',     // Ruta del dashboard
        '/perfil',        // Ruta del perfil del usuario
        '/policy',        // Ruta de la política de privacidad
        '/resetPswd1'     // Ruta de recuperación de contraseña paso 1
      ].includes(event.url) && !event.url.startsWith('/resetPswd2'); // Oculta en rutas dinámicas /resetPswd2
    });
  }

  onClick() {
    this.router.navigate(['/register1']); // Usar ruta absoluta
  }
}
