import { Component } from '@angular/core';
import { Login1Component } from './login1/login1.component';
import { RouterOutlet} from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Login1Component,RouterOutlet,RouterLink,MatButtonModule,MatIconModule,MatDivider,MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {

  // constructor(private router: Router) { }

  // onClick() {
  //   console.log();
  //   this.router.navigate(['/login1']); // Usar ruta absoluta
  // }

}
