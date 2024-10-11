import { Component, ChangeDetectorRef, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../usuarios/profile/profile.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { LibraryComponent } from '../library/library.component';
import { CookieService } from 'ngx-cookie-service';  // Importa CookieService
import { Router } from '@angular/router';  // Importa Router para la redirección
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule } from '@angular/material/menu';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ProfileComponent,
    HomedashComponent,  // Añadido aquí
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule, 
    MatDivider,
    MatMenuModule,
    LibraryComponent
  ]
})
export class DashboardComponent {
  selectedSection: string = 'home';
  imgFile: any;
  imgUrl: any | undefined;
  arrUsr = signal<any>([]);
  cookieExists : boolean = false
  constructor(
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,  // Inyectamos CookieService
    private router: Router,  // Inyectamos Router para la redirección
    private restService: RestService
  ) {}



  async ngOnInit(){
    
    this.cookieExists = this.cookieService.check("access_token")|| this.cookieService.check("refresh_token")
    if(this.cookieExists){
      this.restService.getData().subscribe((res) => {
        this.arrUsr.set(res);
        this.imgUrl = 'data:image/png;base64,' + res.img
      });
    }
    
  }
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
