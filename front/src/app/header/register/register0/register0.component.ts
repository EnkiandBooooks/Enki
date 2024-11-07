import { Component } from '@angular/core';
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
import { RestService } from '../../../rest.service';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register0',
  standalone: true,
  imports: [MatButtonModule, 
    MatToolbarModule,MatButtonModule, 
    MatIconModule, CommonModule, FormsModule,
     MatCardModule, MatFormFieldModule, 
    MatFormField,MatInputModule, RouterLink ],
  templateUrl: './register0.component.html',
  styleUrls: ['./register0.component.css']
})
export class Register0Component {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private restService:RestService, private cookieService:CookieService, private snackBar:MatSnackBar) {
  }

  onSubmit() {
    // Aquí puedes validar el login o enviar los datos a un servicio
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.sendData(this.username, this.password);

    //Comprobar si ya está la cookie

   

    // Si el login es exitoso, puedes redirigir a otra ruta.
  }

  sendData(username: string, password: string): void {
    const body = { usr: username, pwd:password  };
    this.restService.LogIn(body).subscribe({

      next: (res) => {
        if(res.resultado === "Usuario Correcto"){
          
          //Guardar cookies
          console.log(res.accessToken);
          this.cookieService.set('access_token', res.accessToken);
          this.cookieService.set('refresh_token', res.refreshToken);
          this.router.navigate(['/dashboard']);
          this.snackBar.open('Sesión iniciada con éxito', 'Cerrar', {
            duration: 3000, // 3 segundos
            panelClass: ['success-snackbar'] // Clase CSS personalizada para error
          });
        }else{
          this.snackBar.open('No se encuentra el nombre de usuario o la contraseña es incorrecta', 'Cerrar', {
            duration: 3000, // 3 segundos
            panelClass: ['error-snackbar'] // Clase CSS personalizada para error
          });
          
        }
      },
      error: (err) => {
        this.snackBar.open('No se encuentra el nombre de usuario o la contraseña es incorrecta', 'Cerrar', {
          duration: 3000, // 3 segundos
          panelClass: ['error-snackbar'] // Clase CSS personalizada para error
        });
      }
      
      
      
  }); 
  }


}
