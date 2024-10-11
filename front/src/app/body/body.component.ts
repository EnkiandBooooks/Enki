import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Slide {
  image: string;
  alt: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  currentSlide = 0;
  slides: Slide[] = [
    {
      image: 'images/berserk.jpg',
      alt: 'Book 1',
      title: 'The Great Gatsby',
      text: 'A classic novel by F. Scott Fitzgerald'
    },
    {
      image: 'images/naruto.jpg',
      alt: 'Book 2',
      title: 'To Kill a Mockingbird',
      text: 'Harper Lee\'s Pulitzer Prize-winning masterpiece'
    },
    {
      image: 'images/vagabond.jpg',
      alt: 'Book 3',
      title: '1984',
      text: 'George Orwell\'s dystopian social science fiction'
    }
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }
  goLogin(){
    this.router.navigate(['/register0']);
  }
}