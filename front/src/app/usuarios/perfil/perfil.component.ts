import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RestService } from '../../rest.service';
import { CommonModule, NgFor } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatToolbarModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [DatePipe]
})
export class PerfilComponent {
  imgFile: any;
  profileImageUrl: string | ArrayBuffer | null = null;  // URL temporal para mostrar la imagen
  selectedFile: File | null = null;  // Archivo seleccionado
  arrUsr = signal<any>([]);
  edit = false;
  formattedDate = "";
  constructor(private datePipe: DatePipe, private router: Router, private cookieService: CookieService, private restService: RestService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.restService.getData().subscribe((res) => {
      this.arrUsr.set(res);
      this.formattedDate = this.dateFormat(this.arrUsr().creationDate);
      console.log(res)
    });
  }

  // Método que se activa al activar botón de modo edición o confirmar cambios
  onSubmit() {
    this.edit = !this.edit;
    
    if (!this.edit) {
      // Método para actualizar datos a BD

      const formData = new FormData();
      formData.append('file', this.imgFile);  // 'file' debe coincidir con el nombre del campo en Multer
      formData.append('username', this.arrUsr().user);
      formData.append('mail', this.arrUsr().mail);
      console.log(formData)
      // const body = { username: this.arrUsr().user, mail: this.arrUsr().mail, file: this.imgFile};
      console.log(this.imgFile)
      this.restService.postData(formData).subscribe({
        next: (res) => {
          console.log("///////////////////////\n" + res + "\n///////////////////////");
        },
        error: (err) => {
          // Manejar el error y mostrar el mensaje en SnackBar
          
          console.error('Error desde backend:', err);
        }
      });
    }
  }

  dateFormat(date: string): string {
    const day = this.datePipe.transform(date, 'd');
    const monthNumber = Number(this.datePipe.transform(date, 'M'));
    const year = this.datePipe.transform(date, 'y');

    const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month =  monthName[monthNumber-1];

    if (day && month && year) {
      return `${day} de ${month} de ${year}`;
    }

    return "";
  }

  goToResetPwd() {
    this.router.navigate(['/resetPswd']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileInput(file);
    }
  }

  // Método para manejar el archivo seleccionado
  handleFileInput(file: File) {
    this.selectedFile = file;

    // Mostrar la imagen seleccionada en la interfaz
    const reader = new FileReader();
    reader.onload = (e) => {
      this.profileImageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.imgFile = file;
  }
}
