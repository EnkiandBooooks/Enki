import { Component, inject, Injectable, signal, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BooksService } from '../../services/books.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-library',
  standalone: true,
  imports: [MatGridListModule,
              CommonModule,
              MatCardModule,
              NgxPaginationModule,
              MatFormFieldModule,
              MatInputModule,
              FormsModule,
              MatButtonToggleModule
              ],
  providers: [NgModel],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent{
  p: number = 1;
  search: string = '';
  books: any;
  categories = ['Fantasy', 'Manga', 'History', 'Comic', 'Fiction', 'Novels', 'Literature', 'Science'];
  selected: any[] = [];

  booksService = inject(BooksService);

  ngOnInit() {
    this.loadBook()
    // this.restService.getBooks()
    //   .subscribe((res: any) => {
    //     this.books = res;
    // })
  }

  loadBook(){
    
    const searchFilter = (typeof this.search == 'string' && this.search.length > 2) ? `?searchBy=${this.search}` : '?searchBy=';
    const categoryFilter = this.selected.length > 0 ? `&categories=${this.selected.join(',')}` : '&categories=';
    const filter = `${searchFilter}${categoryFilter}`;
    this.booksService.getBooksFilter(filter).subscribe(
      (res) => {
        this.books = res;
        this.books = this.books.map((book: any) => {
          let rating = book.rating % 1 !== 0 ? parseFloat(book.rating.toFixed(1)) : book.rating;
          return { ...book, rating };
        });
      }
      
    )
    console.log(this.books)
  }

  toggleCategory(event: any, category: string) {
    if (event.source._checked) {
      this.selected.push(category);
    } else {
      this.selected = this.selected.filter(c => c !== category);
    }
    this.loadBook();
  }
}
