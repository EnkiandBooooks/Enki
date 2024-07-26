import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-tercerlogin',
  templateUrl: './mi-tercerlogin.component.html',
  styleUrls: ['./mi-tercerlogin.component.css']
})
export class MiTercerloginComponent {
  code: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    const codigoCorrecto = this.code.trim();
    console.log('Código ingresado:', codigoCorrecto);

    // Verifica que el código tenga exactamente 6 dígitos numéricos
    if (codigoCorrecto.length !== 6 || isNaN(Number(codigoCorrecto))) {
      this.errorMessage = 'El código debe tener 6 dígitos numéricos.';
      console.log('Error: Código inválido.');
      return;
    }

    console.log('Código válido, redirigiendo...');
    // Redirigir al componente mi-cuartologin si el código es correcto
    this.router.navigate(['/mi-cuartologin']).then(success => {
      if (success) {
        console.log('Redirección exitosa.');
      } else {
        console.log('Redirección fallida.');
      }
    });
  }
}
