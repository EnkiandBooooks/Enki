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
  topratedSlice = 0;
  webSlide = 0;
  workspaceSlide = 0;
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
      this.nexttopratedSlice();
    }, 4000);
    setInterval(() => {
      this.nextwebSlide();
    }, 7000);    
    setInterval(() => {
      this.nextworkspaceSlide();
    }, 5000);
  }
  prevwebSlide(): void {
    this.webSlide = (this.webSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextwebSlide(): void {
    this.webSlide = (this.webSlide + 1) % this.slides.length;
  }
  prevworkspaceSlide(): void {
    this.workspaceSlide = (this.workspaceSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextworkspaceSlide(): void {
    this.workspaceSlide = (this.workspaceSlide + 1) % this.slides.length;
  }
  prevtopratedSlice(): void {
    this.topratedSlice = (this.topratedSlice - 1 + this.slides.length) % this.slides.length;
  }

  nexttopratedSlice(): void {
    this.topratedSlice = (this.topratedSlice + 1) % this.slides.length;
  }
  goDashboard(){
    this.router.navigate(['/dashboard']);
  }
  goLogin(){
    this.router.navigate(['/register0']);
  }
  scrollToSection() {
    window.location.hash = 'Dashboard';
    window.location.hash = 'hola';
  }
  
}
