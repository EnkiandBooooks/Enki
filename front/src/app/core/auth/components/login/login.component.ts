import { Component, signal, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para trabajar con ngModel
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatFormField } from '@angular/material/form-field';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  hide = signal(true);

  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Cargar dinámicamente el script de reCAPTCHA
    const script = this.renderer.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script)
    console.log("Recaptcha cargado correctamente")
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    const recaptchaResponse = grecaptcha.getResponse();

    if (!recaptchaResponse) {
      this.snackBar.open('Por favor, verifica el reCAPTCHA.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
      return;
    }
    this.sendData(this.username, this.password, recaptchaResponse);
  }

  sendData(username: string, password: string, recaptchaResponse: string): void {
    const body = { usr: username, pwd: password, recaptcha: recaptchaResponse };
    this.authService.LogIn(body).subscribe((res) => {
      if (res.resultado === 'Usuario Correcto' && res.recaptcha === true) {
        // Guardar cookies
        this.cookieService.set('access_token', res.accessToken, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        this.cookieService.set('refresh_token', res.refreshToken, {
          path: '/',
          secure: true,
          sameSite: 'Strict',
        });
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Sesión iniciada con éxito', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      } else {
        this.snackBar.open(
          'No se encuentra el correo o la contraseña es incorrecta',
          'Cerrar',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
      }
      console.log(res);
    });
  }
}
