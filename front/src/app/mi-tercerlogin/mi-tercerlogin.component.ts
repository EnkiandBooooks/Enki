import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-tercerlogin',
  templateUrl: './mi-tercerlogin.component.html',
  styleUrls: ['./mi-tercerlogin.component.css']
})
export class MiTercerloginComponent {
  code: string = ''; // Propiedad para almacenar el código (GPT)
  errorMessage: string | null = null; // Propiedad para manejar mensajes de error

  onSubmit() {
    const codigoCorrecto = this.code.trim(); // Trim elimina los espacios 

    // Verifica que el código tenga exactamente 6 dígitos numéricos
    if (codigoCorrecto.length !== 6 || isNaN(Number(codigoCorrecto))) { //Nan significa Not a Number y verifica que hemos puesto número
      this.errorMessage = 'El código debe tener 6 dígitos numéricos.';
      return;
    }


  

    // Ver en la consola
    console.log('Código enviado:', this.code);
  }
}
