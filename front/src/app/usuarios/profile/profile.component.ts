import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RedirectCommand, Router } from '@angular/router';
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

export class ProfileComponent {
  imgFile: any;
  imgUrl: any | undefined;
  arrUsr = signal<any>([]);
  edit = false;
  formattedDate = "";

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private cookieService: CookieService,
    private restService: RestService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.loadData();
  }

  emailsMatch(): boolean {
    return this.arrUsr().mail === this.arrUsr().confirmMail;
  }

  onSubmit() {
    // Primero, verifica si los emails coinciden
    if (!this.emailsMatch()) {
      this.snackBar.open('Emails do not match. Please verify.', 'Close', { duration: 3000 });
      return; // Detiene el guardado si los emails no coinciden
    }

    this.edit = !this.edit;

    // Procede solo si estamos fuera de modo edición
    if (!this.edit) {
      const formData = new FormData();
      formData.append('file', this.imgFile);  // 'file' debe coincidir con el nombre del campo en Multer
      formData.append('username', this.arrUsr().user);
      formData.append('mail', this.arrUsr().mail);

      this.restService.postData(formData).subscribe({
        next: (res) => {
          console.log("Data updated successfully");
          this.loadData(); // Actualiza los datos sin recargar la página
        },
        error: (err) => {
          console.error('Error desde backend:', err);
          this.snackBar.open('Failed to update data. Please try again.', 'Close', { duration: 3000 });
        }
      });
    }
  }

  loadData() {
    this.restService.getData().subscribe((res) => {
      this.arrUsr.set(res);
      this.formattedDate = this.dateFormat(this.arrUsr().creationDate);
      this.imgUrl = 'data:image/png;base64,' + res.img;
    });
  }

  dateFormat(date: string): string {
    const day = this.datePipe.transform(date, 'd');
    const monthNumber = Number(this.datePipe.transform(date, 'M'));
    const year = this.datePipe.transform(date, 'y');

    const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const month = monthName[monthNumber - 1];

    return day && month && year ? `${day} de ${month} de ${year}` : "";
  }

  goToResetPwd() {
    this.router.navigate(['/resetPswd1']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileInput(file);
    }
  }

  handleFileInput(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.imgFile = file;
  }
}
