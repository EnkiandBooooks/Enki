import { Component, inject, Injectable, signal, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RestService } from '../../rest.service';
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
  categories = ['Fantasy', 'Manga', 'History', 'Comic'];
  selected: string[] = [];

  restService = inject(RestService);

  ngOnInit() {
    this.loadBook()
    // this.restService.getBooks()
    //   .subscribe((res: any) => {
    //     this.books = res;
    // })
  }

  loadBook(){
    const filter = (typeof this.search == 'string' && this.search.length > 2) ? `?searchBy=${this.search}` : '';
    this.restService.getBooksFilter(filter).subscribe(
      (res) => {
        this.books = res;
      }
    )
  }

  toggleCategory(event: any, category: string) {
    if (event.checked) {
      this.selected.push(category);
    } else {
      this.selected = this.selected.filter(c => c !== category);
    }
  }

  filterBooks() {
    this.restService.postCategory(this.selected).subscribe((response) => {
      this.books = response; //Actualiza la lista de libros según la respuesta del backend
      console.log("Libros filtrados por categorías: ", response);
    });
  }
}
