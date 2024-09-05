import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login0',
  standalone: true,
  imports: [MatButtonModule,MatDivider,MatToolbarModule,MatIconModule],
  templateUrl: './login0.component.html',
  styleUrl: './login0.component.css'
})
export class Login0Component {

}
