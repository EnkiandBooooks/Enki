
import { Component, Input } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { workspaceService } from '../services/workspace.service';
import { MatCardModule } from '@angular/material/card';

interface Member {
  name: string;
  memberId: string;
  image: string;
  progress: {
    percentage: number;
  };
  _id: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatGridList,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
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
    userNames: any = [];
    images: any |undefined  = []
    constructor(private authService:AuthService, private workspaceService: workspaceService) {}
  
    showUsersWorkspace(section: string) {
      this.selectedSection = section;
      console.log('Sección seleccionada:', this.selectedSection); 
    this.mostrarComponentes = false;
    }
  
    async ngOnInit(){
      //alert("Llegó la id:"+this.currentWorkspaceId)
      this.workspaceService.getWorkspaceUsers(this.currentWorkspaceId).subscribe((res) => {
        //console.log(JSON.stringify(res));
        this.userNames = res.members.map((member:Member) => ({ name: member.name }));
        this.images = res.members.map((member:Member) => member.image);
        console.log("Images:"+this.images.length+" "+this.images)
      },
      (err) => {
        console.log("Error"+JSON.stringify(err));
      }
    
    );

      
      
    }

}
