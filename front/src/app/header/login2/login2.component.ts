import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../rest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login2',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, CommonModule],
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})
export class Login2Component {


  code: string = '';
  text =1
  constructor(private router: Router, private restService:RestService) {
    this.recibirCodigo()
    console.log(this.text)
  }

  onSubmit( ) {

    if (this.code.length === 6) {
      this.router.navigate(['/login3']);
    } else {
      alert('Por favor, ingrese un código de 6 dígitos.'); // Aparece unua alerta en caso de no poner 6 digitos
    }
  }

  recibirCodigo(){
    this.restService.receive().subscribe({
      next:(data) => {
        const codigo= (JSON.stringify(data["code"]))
        this.text=parseInt(codigo)
      }
    })
  }
}