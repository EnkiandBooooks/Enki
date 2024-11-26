import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true, // Hace que el componente sea standalone
  imports: [] // Importa Angular Material ProgressBar directamente
})
export class TimelineComponent {
}
