import { Component } from '@angular/core';
import { Login1Component } from './login1/login1.component';
import { RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // importar siempre

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Login1Component,RouterOutlet,RouterLink,MatButtonModule,MatIconModule,MatDivider,MatToolbarModule,CommonModule
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})



export class HeaderComponent {
  title = 'enkiweb';
  showHeaderAndBody: boolean = true; // Variable para controlar la visibilidad del header y el body

  constructor(private router: Router) {
    // Suscribirse a los eventos de navegación del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ocultar el header y body si la ruta es '/login1', '/login2' o '/login3'
      this.showHeaderAndBody = !['/login1', '/login2', '/login3','/login0'].includes(event.url);
    });
  }

  onClick() {
    this.router.navigate(['/login0']); // Usar ruta absoluta
  }
}

