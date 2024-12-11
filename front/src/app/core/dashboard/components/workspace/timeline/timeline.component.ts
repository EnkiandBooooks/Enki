import { Component, Input, NgModule } from '@angular/core';
import { workspaceService } from '../services/workspace.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true, // Hace que el componente sea standalone
  imports: [MatFormField, MatLabel,FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule] // Importa Angular Material ProgressBar directamente
  
})
export class TimelineComponent {

  @Input() currentWorkspaceId = "";
  constructor( private snackBar: MatSnackBar, private workspaceService: workspaceService) {}
  customProgress: number = 25; // 
  progressValue: number = 25; // Valor para la barra de progreso
  progressColor: string = '#352d3b'; // Color inicial de la barra

  updateProgress(): void {
    // Validación: Asegura que el número está entre 0 y 100
    if (this.customProgress < 0) {
      this.customProgress = 0;
    } else if (this.customProgress > 100) {
      this.customProgress = 100;
    }

    // Actualiza el progreso y el color
    this.progressValue = this.customProgress;
    this.progressColor = this.getColor(this.customProgress);
  }

  // Determina el color de la barra basado en el progreso
  private getColor(progress: number): string {
    if (progress <= 25) return '#352d3b';
    if (progress <= 50) return '#4c4052';
    if (progress <= 75) return '#6b5165';
    return '#967ca1';
  }
  

}

