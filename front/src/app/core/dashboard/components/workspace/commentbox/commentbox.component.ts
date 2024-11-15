import { Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/workspace.service';
import { CreatecommentComponent } from '../popups/createcomment/createcomment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-commentbox',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    
  ],
  templateUrl: './commentbox.component.html',
  styleUrl: './commentbox.component.css'
})
export class CommentboxComponent {

  commentForm: FormGroup;
  comment = model('');
  readonly dialog = inject(MatDialog);
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService) {
    this.commentForm = this.fb.group({
      comments: this.fb.array([]) 
    });
    
    // Agregar la primera caja de comentario al cargar el componente
    this.addCommentBox();
  }

  get comments(): FormArray {
    return this.commentForm.get('comments') as FormArray;
  }

  addCommentBox() {
    const commentGroup = this.fb.group({
      commentId: [null],
      text: ['', Validators.required],
      user: this.fb.group({
        commentUserId: [null], 
        userName: ['', Validators.required]
      })
    });
    this.comments.push(commentGroup);
  }

  sendCommentData(data: any[]): void {
    this.authService.createComment(data).subscribe(
      (res: any) => {  
        console.log('Respuesta:', res);
        this.snackBar.open('Comentarios enviados', 'Cerrar', { duration: 3000 });
        this.commentForm.reset();
      },
      (error: any) => {  
        console.error('Error en la solicitud:', error);
        this.snackBar.open('Error al enviar comentarios', 'Cerrar', { duration: 3000 });
      }
    );
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentData = this.commentForm.value.comments;
      this.sendCommentData(commentData);
      console.log('Datos del formulario de comentarios:', commentData);
    } else {
      this.snackBar.open('Por favor, completa todos los comentarios', 'Cerrar', { duration: 3000 });
    }
  } 


  openDialog(): void {
    const dialogRef = this.dialog.open(CreatecommentComponent, {
      data: {comment: this.comment},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.comment.set(result);
      }
    });
  }
}