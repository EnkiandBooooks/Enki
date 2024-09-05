import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../rest.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Mostrar alerta de errores

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, MatSnackBarModule, CommonModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})


export class Login2Component {

  errorMessage: string | null = null; // Mensaje de error para mostrar al usuario
  code: string = ''; 
  expectedCode: number | null = null; // Código quee speramos desde el servidor

  constructor(private router: Router, private restService: RestService, private snackBar: MatSnackBar) {
    this.recibirCodigo(); // Llama a la función para recibir el código al inicializar el componente
  }

  onSubmit() {
    const codigoUsuario = this.code.trim(); // Elimina espacios al inicio y al final del código ingresado

    // Validar que el código tenga exactamente 6 caracteres y sea un número
    if (codigoUsuario.length !== 6 || isNaN(Number(codigoUsuario))) {
      this.errorMessage = 'El código debe tener 6 dígitos numéricos.';
      console.log('Error: Código inválido.');
      this.snackBar.open('El código debe tener 6 dígitos numéricos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    // Convertir a número y comparar con el código 
    if (parseInt(codigoUsuario) === this.expectedCode) {
      this.errorMessage = null; 
      this.router.navigate(['/login3']); 
    } else {
      this.errorMessage = 'El código ingresado es incorrecto.'; 
      console.log('Error: El código ingresado no coincide.');
      this.snackBar.open('El código ingresado es incorrecto.', 'Cerrar', {
        duration: 300000, // Duración en milisegundos
      });
    }
  }

  recibirCodigo() {
    this.restService.receive().subscribe({
      next: (data) => {
        this.expectedCode = parseInt(data["code"]); // Asigna el código esperado recibido desde el servidor
        console.log('Código recibido del servidor:', this.expectedCode);
      },
      error: (error) => {
        console.error('Error al recibir el código:', error);
        this.errorMessage = 'No se pudo recibir el código. Intente de nuevo más tarde.';
      }
    });
  }
}