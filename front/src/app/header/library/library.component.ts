import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [MatGridListModule,
              CommonModule,
              MatCardModule
              ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent {
  bookImages = [
    '/images/naruto.jpg', // Usando la misma estructura de rutas que el logo
    '/images/vagabond.jpg',
    '/images/berserk.jpg',
    '/images/naruto.jpg', // Usando la misma estructura de rutas que el logo
    '/images/vagabond.jpg',
    '/images/berserk.jpg'
  ];
}
