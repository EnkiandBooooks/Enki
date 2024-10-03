import { Component } from '@angular/core';
import { RouterOutlet, RoutesRecognized } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Routes } from '@angular/router';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FormsModule, BodyComponent,
     MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'enkiweb';
  showHeaderAndBody: boolean = true; // Nueva variable para controlar la visibilidad

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ocultar header y body en rutas específicas
      this.showHeaderAndBody = !['/login0','/login1', '/login2','/login3','/dashboard'].includes(event.url);
    });
  }

  onClick() {
    this.router.navigate(['/login1']); // Usar ruta absoluta
  }
}