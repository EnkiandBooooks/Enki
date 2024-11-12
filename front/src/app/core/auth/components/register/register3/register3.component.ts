import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register3',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIcon
  ],
  templateUrl: './register3.component.html',
  styleUrls: ['./register3.component.css']
})
export class Register3Component {
  userName: string = '';
  passWord: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  hide1 = signal(true);
  clickEvent1(event: MouseEvent) {
    this.hide1.set(!this.hide1());
    event.stopPropagation();
  }
  hide2 = signal(true);
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  sendData(userName:string, passWord:string):void{
    const cookie = this.cookieService.get('email_sendcode_token');
    const body = {'username':userName, 'passwordUser':passWord, 'cookie': cookie}
    this.authService.sendData(body)
    .subscribe(res => console.log(res))
    console.log(passWord,userName)
  }

  onSubmit() {
    if (this.passWord === this.confirmPassword && this.passWord.length >= 8) {
      this.sendData(this.userName, this.passWord);
      this.cookieService.delete('email_sendcode_token');
      this.router.navigate(['/auth/login']);
    } else {
      alert('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.');
    }
  }
}
