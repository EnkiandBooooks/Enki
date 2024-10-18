import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { RestService } from '../../rest.service';
import { ArrayType } from '@angular/compiler';


@Component({
  selector: 'app-homedash',
  templateUrl: './homedash.component.html',
  styleUrls: ['./homedash.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule,MatChipsModule,MatIcon],
})


export class HomedashComponent implements OnInit {
  arrBooks = signal<any[]>([])
  books: any;
  restService = inject(RestService);
  currentIndex = 0;
  cardWidth = 216; // 200px width + 16px margin-right

  ngOnInit() {
    this.restService.getBooks()
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
}
