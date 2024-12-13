import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { workspaceService } from '../workspace/services/workspace.service';
import { ActivatedRoute } from '@angular/router';


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
    MatMenuModule,],
})


export class HomedashComponent implements OnInit {
  totalBooks : number =  0
  arrBooks = signal<any[]>([])
  books: any;
  booksService = inject(BooksService);
  currentWorkspaceId : string = '';
  currentIndex = 0;
  cardWidth = 216; // 200px width + 16px margin-right
  maxVisibleSlides = 5; // Número de libros visibles en el carrusel a la vez


  constructor(private dashboard: DashboardComponent,  private route: ActivatedRoute, private workspaceservice: workspaceService) {}


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.currentWorkspaceId = params['workspaceId'];  // 'idWorkspace' es el nombre del parámetro de la ruta
      console.log('Workspace ID:', this.currentWorkspaceId);
    });


    // this.workspaceservice.getInfoWorkspace(this.currentWorkspaceId)
    // .subscribe((res)=>{})

    this.booksService.getBooks()
      .subscribe((res) => {
        this.books = res
        this.books = this.books.map((book: any) => {
          let rating = book.rating % 1 !== 0 ? parseFloat(book.rating.toFixed(1)) : book.rating;
          return { ...book, rating };
        });
        this.totalBooks = this.books.length; // Actualiza el número de títulos
        
      })
      
  }
  
  get translateX(): string {
    return `translateX(${-this.currentIndex * this.cardWidth * this.maxVisibleSlides}px)`;
  }
  nextSlide() {
    const maxIndex = Math.ceil(this.totalBooks / this.maxVisibleSlides) - 1;
    if (this.currentIndex < maxIndex) {
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
  // showWorkspaces() {
  //   this.dashboard.showSection('workspaces'); // Para un futuro, boton de descubrir workpsaces
  // }

}
