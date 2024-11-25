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
  booksPerPage: number = 14;
  search: string = '';
  books: any;
  displayedBooks: any;
  categories = ['Fantasy', 'Manga', 'History', 'Comic', 'Fiction', 'Novels', 'Literature', 'Science'];
  selected: any[] = [];

  booksService = inject(BooksService);

  ngOnInit() {
    this.loadBook();
  }

  loadBook(){

    const searchFilter = (typeof this.search == 'string' && this.search.length > 2) ? `?searchBy=${this.search}` : '?searchBy=';
    const categoryFilter = this.selected.length > 0 ? `&categories=${this.selected.join(',')}` : '&categories=';
    const pageFilter = `&page=${this.p}&itemsPerPage=14`;
    const filter = `${searchFilter}${categoryFilter}${pageFilter}`;

    this.booksService.getBooksFilter(filter).subscribe(
      (res) => {
        this.books = res;
        this.books = this.books.map((book: any) => {
          let rating = book.rating % 1 !== 0 ? parseFloat(book.rating.toFixed(1)) : book.rating;
          return { ...book, rating };
        });
        this.updateBooks();
      },
      (error) => {
        console.log('Error al cargar los libros de la pagina: ', error);
      }
    );
  }

  updateBooks(){
    const startIndex = (this.p - 1) * this.booksPerPage;
    const endIndex = startIndex + this.booksPerPage;
    this.displayedBooks = this.books.slice(startIndex, endIndex);
    console.log("Libros pagina: ", this.displayedBooks);

  }

  pageLoad(page : number){
    this.p = page;
    this.updateBooks();
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
