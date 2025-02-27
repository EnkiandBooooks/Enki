import { Component, inject, Injectable, signal, ViewChild, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BooksService } from '../../services/books.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoadingService } from '../../../../shared/services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../../../shared/services/category.service';

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
              MatButtonToggleModule,
              MatIconModule
              ],
  providers: [NgModel],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{
  constructor(private loadingService: LoadingService, private categoryService: CategoryService) {}
  p: number = 1;
  booksPerPage: number = 18;
  search: string = '';
  books: any;
  key: string = '';
  displayedBooks: any;
  categories = ['Fantasy', 'Manga', 'History', 'Comic', 'Fiction', 'Novels', 'Literature', 'Science'];
  selected: any[] = [];
  
  booksService = inject(BooksService);

  

  ngOnInit(): void {
    this.loadingService.show();

    // Suscribirse a los cambios en las categorías seleccionadas
    this.categoryService.selectedCategories$.subscribe((categories) => {
      this.selected = categories; // Actualiza las categorías seleccionadas
      this.loadBook();// Recarga los libros con el filtro actualizado
    });

    this.categoryService.search$.subscribe((search) =>{
      this.search = search;
      this.loadBook();
    });

    this.loadBook(); // Cargar libros inicialmente
  }

  loadBook(){
    const searchFilter = (typeof this.search == 'string' && this.search.length > 2) ? `?searchBy=${this.search}` : '?searchBy=';
    const categoryFilter = this.selected.length > 0 ? `&categories=${this.selected.join(',')}` : '&categories=';
    const pageFilter = `&page=${this.p}&itemsPerPage=14`;
    const filter = `${searchFilter}${categoryFilter}${pageFilter}`;

    this.booksService.getBooksFilter(filter).subscribe(
      (res) => {
        this.p = 1;
        this.books = res;
        this.books = this.books.map((book: any) => {
          let rating = book.rating % 1 !== 0 ? parseFloat(book.rating.toFixed(1)) : book.rating;
          return { ...book, rating, isHovered: false };
        });
        this.updateBooks();
        this.loadingService.hide();
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

  onMouseEnter(book: any) {
    book.isHovered = true;
  }

  onMouseLeave(book: any) {
    book.isHovered = false;
  }
}