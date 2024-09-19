import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para trabajar con ngModel
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importar MatFormFieldModule
import { MatFormField } from '@angular/material/form-field';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-login0',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule,MatButtonModule, MatIconModule, CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatFormField,MatInputModule ],
  templateUrl: './login0.component.html',
  styleUrls: ['./login0.component.css']
})
export class Login0Component {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private restService:RestService) {}

  onSubmit() {
    // Aquí puedes validar el login o enviar los datos a un servicio
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.sendData(this.username, this.password)

    // Si el login es exitoso, puedes redirigir a otra ruta.
  }

  // Método para navegar al registro
  goToRegister() {
    this.router.navigate(['/login1']);
  }


  sendData(username: string, password: string): void {
    const body = { usr: username, pwd:password  };
    this.restService.LogIn(body).subscribe((res) => {
      
      console.log(res);
      this.router.navigate(['/login2']);
    }); //ejemplo cookie
  }


}