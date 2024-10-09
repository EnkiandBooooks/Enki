import { Component, HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../../rest.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Mostrar alerta de errores
import{CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-register2',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, MatSnackBarModule, CommonModule],
  templateUrl: './register2.component.html',
  styleUrl: './register2.component.css'
})

export class Register2Component {
  errorMessage: string | null = null; // Mensaje de error para mostrar al usuario
  code: string =''; 
  expectedCode: number | null = null; // Código quee speramos desde el servidor // Elimina espacios al inicio y al final del código ingresado

  constructor(private router: Router, private restService: RestService, private snackBar: MatSnackBar, private cookieService: CookieService) {}

  onSubmit() {
    const codigo = Number(this.code);
    this.comprobarCodigo(codigo);
  }

  comprobarCodigo(codigo = 1) {
    const cookie = this.cookieService.get('email_sendcode_token');
    const codigoUsuario = codigo;
    const body = {'cookie': cookie, 'codigo': codigoUsuario}
    this.restService.comprobarCodigo(body).subscribe((res) => {
      if(res.resultado == "Correcto"){
        this.router.navigate(['/register3']); 
      }else{
        this.errorMessage = 'El código ingresado es incorrecto.'; 
        this.snackBar.open('El código ingresado es incorrecto.', 'Cerrar', {
          duration: 300000, // Duración en milisegundos
        });
      }
    })
  }
}