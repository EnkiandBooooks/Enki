import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { ArrayType } from '@angular/compiler';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatChipsModule,MatIcon, 
    DashboardComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule, 
    MatDivider,
    MatMenuModule],
})


export class HomedashComponent implements OnInit {
  arrBooks = signal<any[]>([])
  books: any;
  booksService = inject(BooksService);
  currentIndex = 0;
  cardWidth = 216; // 200px width + 16px margin-right

  constructor(private dashboard: DashboardComponent) {} // Inyecta DashboardComponent


  ngOnInit() {
    this.booksService.getBooks()
      .subscribe((res) => {
        this.books = res
        this.books = this.books.map((book: any) => {
          let rating = book.rating % 1 !== 0 ? parseFloat(book.rating.toFixed(1)) : book.rating;
          return { ...book, rating };
        });
      })
      
  }
  
  get translateX(): string {
    return `translateX(${-this.currentIndex * this.cardWidth *5}px)`;
  }

  nextSlide() {
    if (this.currentIndex < 100) {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  showLibrary() {
    this.dashboard.showSection('library'); // Llama a showSection con 'library'
  }
}
