import { Component, Input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LibraryComponent } from '../library/library.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CommentboxComponent } from './commentbox/commentbox.component';
import { TimelineComponent } from "./timeline/timeline.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [MatGridList,
    MatListModule,
    DashboardComponent,
    LibraryComponent,
    HomedashComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCard,
    MatDivider,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
    CommentboxComponent,
    MatGridList,
    MatGridTile, TimelineComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  selectedSection: string = ''; // Inicialmente ninguna sección está seleccionada
  mostrarComponentes: boolean = false;
  currentWorkspaceId : string = '';
  constructor(private authService:AuthService, private dashboard: DashboardComponent, private route: ActivatedRoute) {}


  
  showSectionW(section: string) {
    this.selectedSection = section;
    console.log('Sección seleccionada:', this.selectedSection); 
  this.mostrarComponentes = false;
  }

  async ngOnInit(){
    //alert("Llegó la id:"+this.currentWorkspaceId)
    this.route.params.subscribe(params => {
      this.currentWorkspaceId = params['workspaceId'];  // 'idWorkspace' es el nombre del parámetro de la ruta
      console.log('Workspace ID:', this.currentWorkspaceId);
    });
    
  }
}

