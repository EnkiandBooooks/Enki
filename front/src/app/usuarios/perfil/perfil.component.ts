import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RestService } from '../../rest.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, CommonModule,MatToolbarModule,RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [DatePipe]
})
export class PerfilComponent {

  constructor (private datePipe: DatePipe, private router: Router){}

  arrUsr = signal<any>([])

  //rol = signal<string>('');  // Parte de las vistas

  cookieService = inject(CookieService);
  restService = inject(RestService);
  edit = false;
  formattedDate = "";
  async ngOnInit(){
    const data = this.restService.getData().subscribe((res) => {
      console.log("MUYIMPORTANTE:"+this.arrUsr+"-------------------------------");
      //this.rol.set(res.rol);
      this.arrUsr.set(res);
      this.formattedDate = this.dateFormat(this.arrUsr().creationDate);
    }

    )

    console.log(data);
  }

  onClick(){
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }

   // Método que se actva al activar boton de modo edicion o confirmar cambios
   onSubmit() {

    this.edit = !this.edit;

    if (!this.edit){
        //Metodo para actualizar datos a BD
        const body = {username:this.arrUsr().user,mail:this.arrUsr().mail};
        this.restService.postData(body).subscribe({
          next: (res) => {
            console.log("///////////////////////\n"+res+"\n///////////////////////");

          },
          error: (err) => {
            // Manejar el error y mostrar el mensaje en SnackBar
            console.error('Error desde backend:', err);


        }
      })
    }
  }

  dateFormat(date: string):string {

  // Obtén el día, mes y año
  const day = this.datePipe.transform(date, 'd');
  const monthNumber = this.datePipe.transform(date, 'M'); // Esto te da el número del mes (1-12)
  const year = this.datePipe.transform(date, 'y');

  // Convierte el mes en número a su nombre en español
  let month = '';
  switch (monthNumber) {
    case '1':
      month = 'Enero';
      break;
    case '2':
      month = 'Febrero';
      break;
    case '3':
      month = 'Marzo';
      break;
    case '4':
      month = 'Abril';
      break;
    case '5':
      month = 'Mayo';
      break;
    case '6':
      month = 'Junio';
      break;
    case '7':
      month = 'Julio';
      break;
    case '8':
      month = 'Agosto';
      break;
    case '9':
      month = 'Septiembre';
      break;
    case '10':
      month = 'Octubre';
      break;
    case '11':
      month = 'Noviembre';
      break;
    case '12':
      month = 'Diciembre';
      break;
  }

  // Retorna la fecha en formato "día de mes de año"
  if (day && month && year) {
    return `${day} de ${month} de ${year}`;
  }

  return "";

}
goToResetPwd(){
  this.router.navigate(['/resetPswd']);
}

}
