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
  imports: [CommonModule, MatCardModule,MatChipsModule,MatIcon]
})
export class HomedashComponent implements OnInit {
  arrBooks = signal<any[]>([])
  restService = inject(RestService);

  currentIndex = 0;
  cardWidth = 216; // 200px width + 16px margin-right

  async ngOnInit() {
    const allBooks = await this.restService.getBooks();
    this.arrBooks.set(allBooks);
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
