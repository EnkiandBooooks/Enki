import { Component, Input, NgModule } from '@angular/core';
import { workspaceService } from '../services/workspace.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
interface GroupedMarker {
  position: number;
  count: number;
  comments: string[];
}
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true, // Hace que el componente sea standalone
  imports: [MatFormField, MatLabel,FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, CommonModule, MatTooltipModule] // Importa Angular Material ProgressBar directamente

})
export class TimelineComponent {

  @Input() currentWorkspaceId = "";
  constructor( private snackBar: MatSnackBar, private workspaceService: workspaceService) {}
  customProgress: number = 0; //
  progressValue: number = 0; // Valor para a barra de progreso
  progressColor: string = '#352d3b'; // Color inicial de la barra
  groupedMarkers: GroupedMarker[] =  [];
  arrComments: Set<any> =  new Set();
  markers = []
  getMarkers(): Observable<Array<{ position: number; comment: string }>> {
    return this.workspaceService.recoverComments({ workspace: this.currentWorkspaceId }, this.currentWorkspaceId).pipe(
      map((res: any) => {
        return res.response.timeline.comment.map((item: any) => ({
          position: item.event,
          comment: item.text
      }));
    })
  );
}


  async ngOnInit() {
    this.generateMarkers();
    // setTimeout(() => this.groupMarkers(), 0);
  }
  generateMarkers() {
    const grouped: GroupedMarker[] = [];
    const progressBarWidth = this.getProgressBarWidth(); // Ancho de la barra en píxeles
    const pixelThreshold = 20; // Umbral de distancia en píxeles
    const markers =  this.getMarkers();
    // Convertimos las posiciones relativas (%) a píxeles
    const markersInPixels = this.markers.map(marker => ({
      pixelPosition: (marker.position / 100) * progressBarWidth,
      comment: marker.comment,
    }));

    // Agrupamos los marcadores si están a menos del umbral en píxeles
    markersInPixels.forEach(marker => {
      const existingGroup = grouped.find(
        group => Math.abs(group.position - marker.pixelPosition) <= pixelThreshold
      );

      if (existingGroup) {
        existingGroup.count++;
        existingGroup.comments.push(marker.comment);
      } else {
        grouped.push({
          position: marker.pixelPosition,
          count: 1,
          comments: [marker.comment],
        });
      }
    });

    // Convertimos las posiciones agrupadas de vuelta a porcentaje
    this.groupedMarkers = grouped.map(group => ({
      position: (group.position / progressBarWidth) * 100, // Convertimos de píxeles a %
      count: group.count,
      comments: group.comments,
    }));
  }

  getProgressBarWidth(): number {
    // Obtener el ancho real de la barra de progreso
    const progressBar = document.querySelector('.progress') as HTMLElement;
    return progressBar ? progressBar.offsetWidth : 0;
  }
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
    this.groupMarkers();
  }

  // Determina el color de la barra basado en el progreso
  private getColor(progress: number): string {
    if (progress <= 25) return '#352d3b';
    if (progress <= 50) return '#4c4052';
    if (progress <= 75) return '#6b5165';
    return '#967ca1';
  }


}

