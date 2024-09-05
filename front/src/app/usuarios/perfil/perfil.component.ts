import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { RestService } from '../../rest.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule, CommonModule,MatToolbarModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

}
