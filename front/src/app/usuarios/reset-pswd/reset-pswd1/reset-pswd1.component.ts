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
import { RestService } from '../../../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-pswd1',
  standalone: true,
  imports: [ RouterOutlet,
    MatButtonModule,
    MatToolbarModule,MatButtonModule,
    MatIconModule, CommonModule, FormsModule,
     MatCardModule, MatFormFieldModule,
    MatFormField,MatInputModule,ReactiveFormsModule],
  templateUrl: './reset-pswd1.component.html',
  styleUrl: './reset-pswd1.component.css'
})
export class ResetPswd1Component {

  email: string = '';
  buttonClicked:Boolean = false;
  constructor(
    private router: Router,
    private restService: RestService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar // Inyecta MatSnackBar
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
      console.log(res);
      this.buttonClicked = true;
      this.snackBar.open('Hemos enviado un correo electrónico con el enlace de recuperación de contraseña', 'Cerrar', {
        duration: 10000, // 3 segundos
        panelClass: ['success-snackbar'] // Clase CSS personalizada para error
      });
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
      
      this.snackBar.open('Por favor, ingrese un correo electrónico válido que contenga un "@" y un "."', 'Cerrar', {
        duration: 10000, // 3 segundos
        panelClass: ['error-snackbar'] // Clase CSS personalizada para error
      });
    }
  }
}


