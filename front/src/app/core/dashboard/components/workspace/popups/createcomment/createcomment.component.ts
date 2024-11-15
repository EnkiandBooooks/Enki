import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  comment: string;
}

@Component({
  selector: 'app-createcomment',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogClose],
  templateUrl: './createcomment.component.html',
  styleUrl: './createcomment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatecommentComponent {
  
  readonly dialogRef = inject(MatDialogRef<CreatecommentComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly comment = model("");

  onNoClick(): void {
    this.dialogRef.close();
  }

}
