import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true, // Hace que el componente sea standalone
  imports: [MatProgressBarModule] // Importa Angular Material ProgressBar directamente
})
export class TimelineComponent {
  @Input() progress: number = 0; // Recibe el progreso calculado desde DashboardComponent
}
