import { ChangeDetectorRef, Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-communitylist',
  standalone: true,
  imports: [
       CommonModule,
         // Importa el componente standalone directamente
         MatListModule,
        CommunitylistComponent,
        MatNavList,
        MatSidenav


  ],
  templateUrl: './communitylist.component.html',
  styleUrl: './communitylist.component.css'
})
export class CommunitylistComponent {
    @Output() sectionChange = new EventEmitter<{section: string, workspaceId: string}>();    
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
  
  
    showSection(section: string, workspaceId: string) {
      this.sectionChange.emit({section, workspaceId});
      this.cdr.detectChanges();
      this.router.navigate(['/dashboard/workspace', this.currentWorkspaceId ]);
    
  }

    setCurrentWorkspaceId(id:string){
      this.currentWorkspaceId = id;
    }
}
