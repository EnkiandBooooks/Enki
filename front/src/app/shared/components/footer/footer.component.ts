import { Component } from '@angular/core';

import { RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // importar siempre

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterOutlet,RouterLink,MatButtonModule,MatIconModule,MatDivider,MatToolbarModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
