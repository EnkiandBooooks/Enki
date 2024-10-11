import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

interface Book {
  id: number;
  title: string;
  imageUrl: string;
}

@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css'],
  standalone: true,
  imports: [
            CommonModule, MatCardModule,MatChipsModule,MatIcon
            ]
})
export class HomedashComponent implements OnInit {
  books: Book[] = [
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 1, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    { id: 2, title: 'Berserk', imageUrl: '/images/berserk.jpg'},
    
  ];

  currentIndex = 0;
  cardWidth = 216; // 200px width + 16px margin-right

  ngOnInit() {}

  get translateX(): string {
    return `translateX(${-this.currentIndex * this.cardWidth *5}px)`;
  }

  nextSlide() {
    if (this.currentIndex < this.books.length - 5) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
