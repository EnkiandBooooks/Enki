import { Component, inject, Injectable, signal, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RestService } from '../../rest.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [MatGridListModule,
              CommonModule,
              MatCardModule,
              NgxPaginationModule,
              ],
  providers: [],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent{
  p: number = 1;
  books:any;
  restService = inject(RestService);

  ngOnInit() {
    this.restService.getBooks()
      .subscribe((res: any) => {
        this.books = res;
    })
  }
}
