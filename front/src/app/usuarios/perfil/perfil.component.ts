import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { RestService } from '../../rest.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NgFor, FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, CommonModule,MatToolbarModule,RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  arrUsr = signal<any>([])

  cookieService = inject(CookieService);
  restService = inject(RestService);
  async ngOnInit(){
    const data = await this.restService.getData();
    this.arrUsr.set(data);
    console.log(data);
  }

  onClick(){
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }

}
