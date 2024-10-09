import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule,MatIconModule,MatInputModule,CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  currentSlide = 0;
  slides = [
    { image: 'images/berserk.jpg', alt: 'Lectura 1', text: 'Explora libros en grupo' },
    { image: 'images/naruto.jpg', alt: 'Lectura 2', text: 'Comparte tus pensamientos' },
    { image: 'images/vagabond.jpg', alt: 'Lectura 3', text: 'Conéctate con otros lectores' }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
