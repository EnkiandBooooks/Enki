import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-mi-tercerlogin',
  templateUrl: './mi-tercerlogin.component.html',
  styleUrls: ['./mi-tercerlogin.component.css']
})
export class MiTercerloginComponent {
  code: string = '';
  errorMessage: string | null = null;
  text = 1;

  constructor(private router: Router, private restService: RestService) {
    this.recibirCodigo();
  }

  onSubmit() {
    const codigoCorrecto = this.text;
    const codigoUsuario = parseInt(this.code.trim());

    console.log('Código ingresado:', codigoUsuario);
    console.log('Código correcto:', codigoCorrecto);


    // Verifica que el código tenga exactamente 6 dígitos numéricos
    if (codigoCorrecto != codigoUsuario || isNaN(Number(codigoUsuario))) {
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

  recibirCodigo(){
    this.restService.receive().subscribe({
      next: (data) => {
        console.log(data)
        this.text=data
    }
  });
  }
}
