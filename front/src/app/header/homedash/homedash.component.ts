import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css'],
  standalone: true,
  imports: [MatTabsModule]
})
export class HomedashComponent {
  bookImages = [
    'images/naruto.jpg', // Usando la misma estructura de rutas que el logo
    'images/vagabond.jpg',
    'images/berserk.jpg'
  ];

  cityImages = [
    'images/city1.jpg',
    'images/city2.jpg',
    'images/city3.jpg'
  ];
}
