
import { Component, Input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatGridList,
    MatListModule,
   
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCard,
    MatDivider,
    MatToolbarModule,
    MatMenuModule,
    CommonModule,
 
    MatGridList,
    MatGridTile,
     UsersComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 
    selectedSection: string = ''; // Inicialmente ninguna sección está seleccionada
    mostrarComponentes: boolean = false;
    @Input() currentWorkspaceId : string = '';
    constructor(private authService:AuthService) {}
  
    showUsersWorkspace(section: string) {
      this.selectedSection = section;
      console.log('Sección seleccionada:', this.selectedSection); 
    this.mostrarComponentes = false;
    }
  
    async ngOnInit(){
      //alert("Llegó la id:"+this.currentWorkspaceId)
  
      
    }

}
