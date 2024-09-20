import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-cambio-pass3',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cambio-pass3.component.html',
  styleUrls: ['./cambio-pass3.component.css']
})
export class CambioPass3Component {
  userName: string = '';
  newPassword: string = '';  // Declarar la propiedad aquí
  confirmPassword: string = '';

  constructor(private router: Router, private restService: RestService, private cookieService: CookieService) {}

  ngOnInit(): void {
    if (!this.cookieService.get("email_sendcode_token")) {  // Verifica si la cookie no existe
      console.log("No hay cookie de email");
      this.router.navigate(['/']); // Navega al inicio de la app
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.returnValue = '¿Estás seguro de que quieres recargar o salir de esta página? Podrías perder los datos ingresados.';
    console.log($event.returnValue);
    if ($event.returnValue) {
      this.cookieService.delete("email_sendcode_token");  // Eliminamos la cookie al recargar
    }
  }

  sendData(userName: string, passWord: string): void {
    const cookie = this.cookieService.get('access_token');
    const body = { userName: userName, passWord: passWord, cookie: cookie };
    this.restService.sendData(body).subscribe(res => console.log(res));
    console.log(passWord, userName);
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword && this.newPassword.length >= 8) {
      this.sendData(this.userName, this.newPassword);
      this.router.navigate(['/']);
    } else {
      alert('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.');
    }
  }
}



