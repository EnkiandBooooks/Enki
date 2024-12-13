import { Component, inject, Input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { workspaceService } from '../services/workspace.service';
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
  @Input() currentWorkspaceId = "";
  arrComments = signal<any>([]);
  dialogresponse: { text: string; page: number } = { text: '', page: 1};
  readonly dialog = inject(MatDialog);
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private workspaceService: workspaceService) {
    this.commentForm = this.fb.group({
      comments: this.fb.array([]) 
    });
    
    // Agregar la primera caja de comentario al cargar el componente
    
    this.addCommentBox();
  }

  async ngOnInit() {
    this.recoverComment();
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

  sendCommentData(data: any): void {
    this.workspaceService.createComment(data).subscribe(
      (res: any) => {  
        console.log('Respuesta:', res);
        this.snackBar.open('Comentarios enviados', 'Cerrar', { duration: 3000 });
        this.commentForm.reset();
        this.recoverComment();
      },
      (error: any) => {  
        console.error('Error en la solicitud:', error);
        this.snackBar.open('Error al enviar comentarios', 'Cerrar', { duration: 3000 });
      }
    );
  }
  deleteComment(id: string ){
    this.workspaceService.deleteComment({'workspaceId':this.currentWorkspaceId, 'commentId':id}).subscribe(
      (res: any) => {  
        console.log('Respuesta:', res);
        this.snackBar.open('Comentario eliminado', 'Cerrar', { duration: 3000 });
        this.commentForm.reset();
        this.recoverComment();
      },
      (error: any) => {  
        console.error('Error en la solicitud:', error);
        this.snackBar.open('Error al eliminar comentarios', 'Cerrar', { duration: 3000 });
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


  recoverComment(){
    this.workspaceService.recoverComments({'workspace':this.currentWorkspaceId}, this.currentWorkspaceId).subscribe(
      (res: any) => {  
        console.log(JSON.stringify(res.response.timeline.comment));
        this.arrComments.set(res.response.timeline.comment);
      },
      (error: any) => {  
        console.error('Error en la solicitud:', error);
        this.snackBar.open('Errors', 'Cerrar', { duration: 3000 });
      }
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatecommentComponent, {
      data: { text: this.dialogresponse.text, page: this.dialogresponse.page },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        // Guarda el resultado en el objeto response
        this.dialogresponse = {
          text: result.text,
          page: result.page,
        
        };

        const body={
          'text':this.dialogresponse.text, 
          'workspace':this.currentWorkspaceId
         }
         this.sendCommentData(body);
        
      }
    });
   
  }
    deleteCommunity(): void {
      this.workspaceService.deleteCommunity({'workspaceId':this.currentWorkspaceId}).subscribe(
        (res: any) => {  
          console.log('Respuesta:', res);
          this.snackBar.open('comunidad eliminada', 'Cerrar', { duration: 3000 });
          
        },
        (error: any) => {  
          console.error('Error en la solicitud:', error);
          this.snackBar.open('Error al eliminar comentarios', 'Cerrar', { duration: 3000 });
        }
      );

      
    }
   }
  
  
