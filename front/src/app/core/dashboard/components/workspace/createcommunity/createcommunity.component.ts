import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/workspace.service';



interface CommunityData {
  communityName: string;
  book: string;
  stamps: number;
  privacy: string;
}

@Component({
  selector: 'app-createcommunity',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule
  ],
  templateUrl: './createcommunity.component.html',
  styleUrls: ['./createcommunity.component.css']
})
export class CreatecommunityComponent {
  communityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.communityForm = this.fb.group({
      communityName: ['', Validators.required],
      book: ['', Validators.required],
      stamps: [0, [Validators.required, Validators.min(1)]],
      privacy: ['public', Validators.required]
    });
  }

  sendData(data: CommunityData): void {
    const body: CommunityData = {
      communityName: data.communityName,
      book: data.book,
      stamps: data.stamps,
      privacy: data.privacy
    };
    this.authService.createWorkspace(body).subscribe(
      (res: any) => {  
        console.log('Respuesta:', res);
        this.snackBar.open('Comunidad creada ', 'Cerrar', { duration: 3000 });
      },
      (error: any) => {  
        console.error('Error en la solicitud:', error);
        this.snackBar.open('Error ', 'Cerrar', { duration: 3000 });
      }
    );
  }

  onSubmit(): void {
    if (this.communityForm.valid) {
      this.sendData(this.communityForm.value as CommunityData);
      console.log('Datos del formulario:', this.communityForm.value);
    } else {
      this.snackBar.open(' completa todos los campos', 'Cerrar', { duration: 3000 });
    }
  }
}
