import { Component } from '@angular/core';
import { Routes, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestService } from '../../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login1',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    HeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css',
})
export class Login1Component {
  email: string = '';

  constructor(
    private router: Router,
    private restService: RestService,
    private cookieService: CookieService,
    private snackBar:MatSnackBar
  ) {}

  // Método para validar el formato del correo electrónico
  validateEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  sendData(email: string): void {
    const body = { email: email };
    this.restService.enviarMail(body).subscribe({
      next: (res) => {
        // Si el backend responde exitosamente
        this.cookieService.set('email_sendcode_token', res.email_sendcode_token); // Guardar el token
        console.log(res);
        this.router.navigate(['/login2']); // Navegar a login2
      },
      error: (err) => {
        // Manejar el error y mostrar el mensaje en SnackBar
        console.error('Error desde backend:', err);
        this.snackBar.open(err.error.resultado || 'Ocurrió un error. Por favor, inténtelo nuevamente.', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
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
        duration: 3000, // 3 segundos
        panelClass: ['error-snackbar'] // Clase CSS personalizada para error
      });
    }
  }
}
