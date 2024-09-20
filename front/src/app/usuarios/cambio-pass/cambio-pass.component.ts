import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para trabajar con ngModel
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatFormField } from '@angular/material/form-field';
import { RestService } from '../../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-cambio-pass',
  standalone: true,
  imports: [ RouterOutlet,
    MatButtonModule, 
    MatToolbarModule,MatButtonModule, 
    MatIconModule, CommonModule, FormsModule,
     MatCardModule, MatFormFieldModule, 
    MatFormField,MatInputModule,ReactiveFormsModule],
  templateUrl: './cambio-pass.component.html',
  styleUrl: './cambio-pass.component.css'
})
export class CambioPassComponent {

  email: string = '';

  constructor(
    private router: Router,
    private restService: RestService,
    private cookieService: CookieService
  ) {}

  // Método para validar el formato del correo electrónico
  validateEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sendData(email: string): void {
    const body = { email: email };
    this.restService.resetPswd(body).subscribe((res) => {
      this.cookieService.set('email_sendcode_token', res.email_sendcode_token); //Creamos un token de un solo uso para la pantalla siguiente, una vez se recarga login2 se borra para evitar mandar el correo cada vez
      this.cookieService.set('access_token', res.email_sendcode_token);
      console.log(res);
      this.router.navigate(['/resetPswd2']);
    }); //ejemplo cookie
  }
  // Método que se llama al enviar el formulario
  onSubmit(email: string) {
    console.log(email);
    if (this.validateEmail(this.email)) {
      // Navega a Login2 si el email es válido
      this.sendData(email);
    } else {
      // Mostrar un mensaje de error si el email no es válido
      alert(
        'Por favor, ingrese un correo electrónico válido que contenga un "@" y un "."'
      );
    }
  }
}

