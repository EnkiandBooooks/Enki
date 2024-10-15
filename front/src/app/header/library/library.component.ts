import { Component, inject, Injectable, signal, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RestService } from '../../rest.service';
import { PageEvent, MatPaginatorModule, MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

// TODO Conseguir enlazar el MatPaginator con los libros.
@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = "First page"; //$localize`First page`;
  itemsPerPageLabel = "Item in page"//$localize`Items per page:`;
  lastPageLabel = "Last page";//$localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = "Next page";//'Next page';
  previousPageLabel = "Previous page";//'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return "Pagina 1 de 1"; //$localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} de ${amountPages}`;//$localize`Page ${page + 1} of ${amountPages}`;
  }
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [MatGridListModule,
              CommonModule,
              MatCardModule,
              MatPaginatorModule
              ],
  providers: [{provide: MatPaginatorIntl, useClass:MyCustomPaginatorIntl}],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent{
  arrBooks = signal<any[]>([])
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  restService = inject(RestService);

  async ngOnInit() {
    const allBooks = await this.restService.getBooks();
    this.arrBooks.set(allBooks);
  }

  // ngAfterViewInit() {
  //   this.arrBooks.paginator = this.paginator;
  // }
}
