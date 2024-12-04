import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../auth/components/profile/profile.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { LibraryComponent } from '../library/library.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { CreatecommunityComponent } from '../workspace/createcommunity/createcommunity.component';
import { TimelineComponent } from '../workspace/timeline/timeline.component';
import { CommentboxComponent } from '../workspace/commentbox/commentbox.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { LoadingService } from '../../../../shared/services/loading.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    HomedashComponent,
    CreatecommunityComponent,
    TimelineComponent, // Importa el componente standalone directamente
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDivider,
    MatMenuModule,
    LibraryComponent,
    MatCard,
    CommentboxComponent,
    WorkspaceComponent,
    RouterLink,
    RouterOutlet
  ]
})
export class DashboardComponent {
  selectedSection: string = 'home';
  imgFile: any;
  imgUrl: any | undefined;
  arrUsr = signal<any>([]);
  cookieExists: boolean = false;
  currentWorkspaceId: string ='';

  constructor(
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.loadingService.show();
    this.cookieExists = this.cookieService.check("access_token") || this.cookieService.check("refresh_token");
    if (this.cookieExists) {
      this.authService.getData().subscribe((res) => {
        this.arrUsr.set(res);
        this.imgUrl = 'data:image/png;base64,' + res.img;
        console.log(this.arrUsr().userWorkspaces)

        this.loadingService.hide();
      }, (error) => {
        console.log("Error al cargar los datos del usuario", error);
          this.loadingService.hide();
      });
    }else {
      this.loadingService.hide();
    }
  }


  showSection(section: string) {
    this.selectedSection = section;
    this.cdr.detectChanges();
    
    if(section === "workspace"){

      this.router.navigate(['/']).then(() => { this.router.navigate(['/dashboard/workspace', this.currentWorkspaceId ])});
    }else{
      this.router.navigate(["/dashboard/"+section])
    }
  
}

  onLogout() {
    this.cookieService.delete('access_token', '/', 'localhost');
    this.cookieService.delete('refresh_token', '/', 'localhost');
    window.location.href = '../landingpage/landingpage.html';
  }
  setCurrentWorkspaceId(id:string){
    this.currentWorkspaceId = id;
  }
  
}


