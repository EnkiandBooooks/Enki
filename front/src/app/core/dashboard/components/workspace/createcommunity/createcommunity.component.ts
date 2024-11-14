import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/workspace.service';

<<<<<<< HEAD


interface CommunityData {
  communityName: string;
  book: string;
  stamps: number;
  privacy: string;
}

=======
>>>>>>> c76a9a7d27822bc640fdab9a24cd24a89f304d5d
@Component({
  selector: 'app-createcommunity',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Desactiva encapsulación de estilos
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

  onSubmit(): void {
    if (this.communityForm.valid) {
      this.authService.createWorkspace(this.communityForm.value).subscribe(
        () => this.snackBar.open('Comunidad creada', 'Cerrar', { duration: 3000 }),
        (error: any) => this.snackBar.open('Error en la creación', 'Cerrar', { duration: 3000 })
      );
    } else {
      this.snackBar.open('Completa todos los campos', 'Cerrar', { duration: 3000 });
    }
  }
}

