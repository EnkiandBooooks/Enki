import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from '../../rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cambio-pass3',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './cambio-pass3.component.html',
  styleUrls: ['./cambio-pass3.component.css']
})
export class CambioPass3Component {

  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private cookieService: CookieService,
    private snackBar: MatSnackBar // Inyecta MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['tokenPswd']; // Captura el token de la URL
      console.log('Token capturado:', this.token); // Verifica que el token sea capturado correctamente
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.returnValue = '¿Estás seguro de que quieres recargar o salir de esta página? Podrías perder los datos ingresados.';
    if ($event.returnValue) {
      this.cookieService.delete("email_sendcode_token");
    }
  }

  sendData(newPassword: string): void {
    const cookie = this.cookieService.get('access_token');
    const body = { newPassword: newPassword};

    // console.log('Cuerpo del POST:', body);  // Verifica el cuerpo de la solicitud
    // console.log('Token en la URL:', this.token);  // Verifica que el token es correcto
    // console.log(newPassword); //Verifica la contraseña enviada por front

    this.restService.resetPswd3(body, this.token).subscribe(res => console.log(res));
  }


  onSubmit() {
    if (this.newPassword === this.confirmPassword && this.newPassword.length >= 8) {
      this.sendData(this.newPassword);
      this.router.navigate(['/login0']);
      this.snackBar.open('Contraseña cambiada con éxito', 'Cerrar', {
        duration: 3000, // 3 segundos
        panelClass: ['success-snackbar'] // Clase CSS personalizada para éxito
      });
    } else {
      this.snackBar.open('Por favor, asegúrese de que las contraseñas coincidan y tengan al menos 8 caracteres.', 'Cerrar', {
        duration: 3000, // 3 segundos
        panelClass: ['error-snackbar'] // Clase CSS personalizada para error
      });
    }
  }
}
