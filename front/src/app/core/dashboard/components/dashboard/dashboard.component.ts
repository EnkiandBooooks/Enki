import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../auth/components/profile/profile.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { LibraryComponent } from '../library/library.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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
    WorkspaceComponent
  ]
})
export class DashboardComponent {
  selectedSection: string = '';
  imgFile: any;
  imgUrl: any | undefined;
  arrUsr = signal<any>([]);
  cookieExists: boolean = false;

  currentChapter: number = 3;
  totalChapters: number = 20;

  get progress(): number {
    return (this.currentChapter / this.totalChapters) * 100;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.cookieExists = this.cookieService.check("access_token") || this.cookieService.check("refresh_token");
    if (this.cookieExists) {
      this.authService.getData().subscribe((res) => {
        this.arrUsr.set(res);
        this.imgUrl = 'data:image/png;base64,' + res.img;
        console.log(this.arrUsr().userWorkspaces)
      });
    }
  }

  
  showSection(section: string) {
    this.selectedSection = section;
    this.cdr.detectChanges();

  }

  onLogout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    window.location.href = '../landingpage/landingpage.html';
  }
}
