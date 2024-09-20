import { Component, HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../rest.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Mostrar alerta de errores
import{CookieService} from 'ngx-cookie-service'

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, MatSnackBarModule, CommonModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})

export class Login2Component {

  errorMessage: string | null = null; // Mensaje de error para mostrar al usuario
  code: string =''; 
  expectedCode: number | null = null; // Código quee speramos desde el servidor // Elimina espacios al inicio y al final del código ingresado

  constructor(private router: Router, private restService: RestService, private snackBar: MatSnackBar, private cookieService: CookieService) {
     // Llama a la función para recibir el código al inicializar el componente
  }

  
  ngOnInit(): void {
    if (!this.cookieService.get("email_sendcode_token")) {  // Verifica si la cookie no existe
      console.log("No hay cookie de email");
      this.router.navigate(['/']); //Navega al inicio de la app
    }
  }
  
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    // Mostrar el mensaje de confirmación al recargar la página
    $event.returnValue = '¿Estás seguro de que quieres recargar o salir de esta página? Podrías perder los datos ingresados.';
    // this.cookieService.delete("email_sendcode_token"); //Eliminamos la cookie al recargar y evitar mandar el correo de confirmación cada vez

  }

  @HostListener('window:unload', ['$event'])
onUnload($event: any): void {
  // Eliminar el token cuando el usuario realmente abandona la página
  this.cookieService.delete("email_sendcode_token");
}

  onSubmit() {
    const codigo = Number(this.code);
    this.comprobarCodigo(codigo);
  }

  comprobarCodigo(codigo = 1) {
    const cookie = this.cookieService.get('access_token');
    const codigoUsuario = codigo;
    const body = {'cookie': cookie, 'codigo': codigoUsuario}
    this.restService.comprobarCodigo(body).subscribe((res) => {
      if(res.resultado == "Correcto"){
        this.router.navigate(['/login3']); 
      }else{
        this.errorMessage = 'El código ingresado es incorrecto.'; 
        this.snackBar.open('El código ingresado es incorrecto.', 'Cerrar', {
          duration: 300000, // Duración en milisegundos
        });
      }
    })
  }
}