import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css'],
  standalone: true,
  imports: [MatGridListModule,
            CommonModule
            ]
})
export class HomedashComponent {
  bookImages = [
    '/images/naruto.jpg', // Usando la misma estructura de rutas que el logo
    '/images/vagabond.jpg',
    '/images/berserk.jpg',
    '/images/naruto.jpg', // Usando la misma estructura de rutas que el logo
    '/images/vagabond.jpg',
    '/images/berserk.jpg'
  ];
}
