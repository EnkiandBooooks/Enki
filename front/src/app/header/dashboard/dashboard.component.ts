import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from '../../usuarios/perfil/perfil.component';
import { CookieService } from 'ngx-cookie-service';  // Importa CookieService
import { Router } from '@angular/router';  // Importa Router para la redirección
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    PerfilComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class DashboardComponent {
  selectedSection: string = 'dashboard';

  constructor(
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,  // Inyectamos CookieService
    private router: Router  // Inyectamos Router para la redirección
  ) {}

  // Método para cambiar la sección mostrada
  showSection(section: string) {
    this.selectedSection = section;
    console.log('Sección seleccionada:', this.selectedSection);
    this.cdr.detectChanges();
  }

  // Método para cerrar sesión
  onLogout() {
    // Elimina las cookies de autenticación
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');

    // Redirige al usuario a la página de inicio
    this.router.navigate(['/']);  // Redirige a localhost:4200
  }
}
