import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';  // Importa Router y NavigationEnd
import { filter } from 'rxjs/operators'; // Importa filter

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  showHeader: boolean = true; // Variable para controlar la visibilidad del header y el body

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ocultar el header y body si la ruta es '/login1', '/login2' o '/login3'
      this.showHeader = !['/header'].includes(event.url); // Cerramos las comillas correctamente
    });
  }
}

