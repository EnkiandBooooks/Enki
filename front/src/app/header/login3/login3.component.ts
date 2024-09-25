import { Component, HostListener } from '@angular/core';
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

  constructor(private router: Router, private restService:RestService, private cookieService: CookieService) {}

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   // Mostrar el mensaje de confirmación al recargar la página
  //   $event.returnValue = '¿Estás seguro de que quieres recargar o salir de esta página? Podrías perder los datos ingresados.';
  //   console.log($event.returnValue)
  //   if($event.returnValue){
  //     this.cookieService.delete("email_sendcode_token"); //Eliminamos la cookie al recargar y evitar mandar el correo de confirmación cada vez
  //   }
  // }

  hasUnsavedChanges():boolean {
    console.log("Hola")
    if(this.userName === '' && this.passWord === '' && this.confirmPassword === ''){
      return true;
    }
    return false;
  }

  sendData(userName:string, passWord:string):void{
    const cookie = this.cookieService.get('email_sendcode_token');
    const body = {'username':userName, 'passwordUser':passWord, 'cookie': cookie}
    this.restService.sendData(body)
    .subscribe(res => console.log(res))
    console.log(passWord,userName)
  }
  // 

  onSubmit() {
    if (this.passWord === this.confirmPassword && this.passWord.length >= 8) {
      this.sendData(this.userName, this.passWord);
      this.router.navigate(['/']);
    } else {
      alert('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.');
    }
  }
}
