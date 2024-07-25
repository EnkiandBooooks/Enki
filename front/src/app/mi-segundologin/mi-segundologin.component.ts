import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-segundologin',
  templateUrl: './mi-segundologin.component.html',
  styleUrls: ['./mi-segundologin.component.css']
})
export class MiSegundologinComponent {
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onClick(email: string) {
    // Verifica si el correo electrónico está vacío. El Trim elimina los espacios en blanco
    if (!email.trim() || !this.validateEmail(email)) {
      this.errorMessage = 'Por favor, introduce un correo electrónico válido.';
      return;
    }

    // Verificar si el correo electrónico contiene un '@' y un '.'. la "!" indice contrario
    if (!email.includes('@') || !email.includes('.')) {
      this.errorMessage = 'Por favor, introduce un correo electrónico válido.';
      return;
    }

 
    // Verificar en consola que está correcto
    console.log('Correo electrónico:', email);

    // Esto me llega al login de los dígitos
    this.router.navigate(['/mi-tercerlogin']);
  }

  //Parte GPT
  validateEmail(email: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

