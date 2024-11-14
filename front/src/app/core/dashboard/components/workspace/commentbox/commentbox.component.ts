import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/workspace.service';

@Component({
  selector: 'app-commentbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBar
  ],
  templateUrl: './commentbox.component.html',
  styleUrl: './commentbox.component.css'
})
export class CommentboxComponent {

  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.commentForm = this.fb.group({
      comments: this.fb.array([]) // Array para almacenar múltiples comentarios
    });
  }

  get comments(): FormArray {
    return this.commentForm.get('comments') as FormArray;
  }

  addCommentBox() {
    const commentGroup = this.fb.group({
      commentId: [null], // Generado en el backend
      text: ['', Validators.required],
      user: this.fb.group({
        commentUserId: [null], // Rellenado según el usuario logeado
        userName: ['', Validators.required]
      })
    });
    this.comments.push(commentGroup);
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value.comments;
      console.log('Comentarios enviados:', commentData);
      this.snackBar.open('Comentarios enviados', 'Cerrar', { duration: 3000 });
      this.commentForm.reset();
    } else {
      this.snackBar.open('Por favor, completa todos los comentarios', 'Cerrar', { duration: 3000 });
    }
  }
}
