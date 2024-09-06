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
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login0',
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
  templateUrl: './login0.component.html',
  styleUrls: ['./login0.component.css']
})
export class Login0Component {
  userName: string = '';
  passWord: string = '';
  confirmPassword: string = '';
  // mail: string = 'gerardacostabazaga@gmail.com';

  constructor(private router: Router, private restService:RestService, private cookieService: CookieService) {}


  sendData(userName:string, passWord:string):void{
    const cookie = this.cookieService.get('access_token');
    const body = {'userName':userName, 'passWord':passWord, 'cookie': cookie}
    this.restService.sendData(body)
    .subscribe(res => console.log(res))
    console.log(passWord,userName)
  }
  // 

  onSubmit() {
    if (this.passWord === this.confirmPassword && this.passWord.length >= 8) {
      this.sendData(this.userName, this.passWord);
      this.router.navigate(['/login4']);
    } else {
      alert('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.');
    }
  }
}


