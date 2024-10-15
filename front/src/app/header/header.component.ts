import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { Register1Component } from './register/register1/register1.component';
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
import { CookieService } from 'ngx-cookie-service';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../rest.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Register1Component,RouterOutlet,RouterLink,MatButtonModule,MatIconModule,MatDivider,MatToolbarModule,CommonModule, MatMenuModule, MatCardModule

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})



export class HeaderComponent {
  selectedSection: string = 'ladingPage';
  imgFile: any;
  imgUrl: any | undefined;
  cookieExists : boolean = false
  title = 'enkiweb';
  arrUsr = signal<any>([]);
  showHeaderAndBody: boolean = true; // Variable para controlar la visibilidad del header y el body
  constructor(private router: Router, private cookieService: CookieService, private restService :RestService, private cdr: ChangeDetectorRef) {
    // Suscribirse a los eventos de navegación del router
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Ocultar el header y body si la ruta es '/login1', '/login2' o '/login3'
      this.showHeaderAndBody = !['/register1', '/register2', '/register3','/register0','/dashboard'].includes(event.url);
    });
  }

  async ngOnInit(){

    this.cookieExists = this.cookieService.check("access_token")|| this.cookieService.check("refresh_token")
    if(this.cookieExists){
      this.restService.getData().subscribe((res) => {
        this.arrUsr.set(res);
        this.imgUrl = 'data:image/png;base64,' + res.img
      });
    }

  }
  async navigateProfile(){
    this.router.navigate(['perfil']);
    this.cdr.detectChanges();
  }
  onLogout() {
    // Elimina las cookies de autenticación
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');

    // Redirige al usuario a la página de inicio
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });  // Redirige a localhost:4200
  }

}

