import { Component, Input } from '@angular/core';
import { workspaceService } from '../services/workspace.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  standalone: true, // Hace que el componente sea standalone
  imports: [] // Importa Angular Material ProgressBar directamente
})
export class TimelineComponent {

  @Input() currentWorkspaceId = "";
  constructor( private snackBar: MatSnackBar, private workspaceService: workspaceService) {}

  

}

