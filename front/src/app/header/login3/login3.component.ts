import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-login3',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  templateUrl: './login3.component.html',
  styleUrls: ['./login3.component.css']
})
export class Login3Component {
  userName: string = '';
  passWord: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private restService:RestService) {}


  sendData(userName:string, passWord:string ):void{
    const body= {'userName':userName, 'passWord':passWord}
    this.restService.send(body)
    .subscribe(res => console.log(res))
    console.log(passWord,userName)
  }
  // 

  onSubmit() {
    if (this.passWord === this.confirmPassword && this.passWord.length >= 8) {
      this.router.navigate(['/login4']);
    } else {
      alert('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.');
    }
  }
}
