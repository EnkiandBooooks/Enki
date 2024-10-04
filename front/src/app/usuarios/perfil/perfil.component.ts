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
  profileImageUrl: string | ArrayBuffer | null = null;  // URL temporal para mostrar la imagen
  selectedFile: File | null = null;  // Archivo seleccionado
  arrUsr = signal<any>([]);
  edit = false;
  formattedDate = "";
  constructor(private datePipe: DatePipe, private router: Router, private cookieService: CookieService, private restService: RestService, private snackBar: MatSnackBar) {}

  async ngOnInit() {
    this.restService.getData().subscribe((res) => {
      console.log("MUYIMPORTANTE:" + this.arrUsr + "-------------------------------");
      this.arrUsr.set(res);
      this.formattedDate = this.dateFormat(this.arrUsr().creationDate);
    });
  }

  onClick() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }

  // Método que se activa al activar botón de modo edición o confirmar cambios
  onSubmit() {
    this.edit = !this.edit;

    if (!this.edit) {
      // Método para actualizar datos a BD
      const body = { username: this.arrUsr().user, mail: this.arrUsr().mail };
      this.restService.postData(body).subscribe({
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
    const monthNumber = this.datePipe.transform(date, 'M');
    const year = this.datePipe.transform(date, 'y');

    let month = '';
    switch (monthNumber) {
      case '1': month = 'Enero'; break;
      case '2': month = 'Febrero'; break;
      case '3': month = 'Marzo'; break;
      case '4': month = 'Abril'; break;
      case '5': month = 'Mayo'; break;
      case '6': month = 'Junio'; break;
      case '7': month = 'Julio'; break;
      case '8': month = 'Agosto'; break;
      case '9': month = 'Septiembre'; break;
      case '10': month = 'Octubre'; break;
      case '11': month = 'Noviembre'; break;
      case '12': month = 'Diciembre'; break;
    }

    if (day && month && year) {
      return `${day} de ${month} de ${year}`;
    }

    return "";
  }

  goToResetPwd() {
    this.router.navigate(['/resetPswd']);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);  // 'file' debe coincidir con el nombre del campo en Multer

    this.restService.postData(formData).subscribe({
      next: (res) => {
        console.log('Imagen subida correctamente:', res);
      },
      error: (err) => {
        console.error('Error al subir la imagen:', err);
        this.snackBar.open('Error al subir la imagen o formato desconocido, solo se admiten archivos .jpg, .jpeg y .png', 'Cerrar', {
          duration: 6000, // 3 segundos
          panelClass: ['error-snackbar'] // Clase CSS personalizada para error
        });
      }
    });
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

    // Subir la imagen al servidor
    this.uploadImage(file);
  }
}
