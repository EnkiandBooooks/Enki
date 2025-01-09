
import { Component, ChangeDetectorRef, signal,Input  } from '@angular/core';
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
import { CommunitylistComponent } from '../communitylist/communitylist.component';

@Component({
  selector: 'app-toolbar',
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
    RouterOutlet,
    CommunitylistComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  categories = ['Fantasy', 'Manga', 'History', 'Comic', 'Fiction', 'Novels', 'Literature', 'Science'];
  selected: any[] = [];
}
