import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../services/workspace.service';
import { BooksService } from '../services/books.service';


interface CommunityData {
  communityName: string;
  book: string;
  stamps: number;
  privacy: string;
}

@Component({
  selector: 'app-createcommunity',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Desactiva encapsulación de estilos
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './createcommunity.component.html',
  styleUrls: ['./createcommunity.component.css']
})
export class CreatecommunityComponent {
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  communityForm: FormGroup;
  options!: string[];
  filteredOptions!: string[];
  books: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private booksService: BooksService,
  ) {
    this.communityForm = this.fb.group({
      communityName: ['', Validators.required],
      book: ['', Validators.required],
      stamps: [0, [Validators.required, Validators.min(1)]],
      privacy: ['public', Validators.required]
    });
  }
  
  ngOnInit(){
    this.booksService.getBooks()
      .subscribe((res) => {
        this.books = Object.entries(res);
        this.options =  this.books.map((book:any) => book[1].title)
        this.filteredOptions = this.options.slice();
      })
  }

  onSubmit(): void {
    if (this.communityForm.valid) {
      this.authService.createWorkspace(this.communityForm.value).subscribe(
        () => this.snackBar.open('Comunidad creada', 'Cerrar', { duration: 3000 }),
        (error: any) => this.snackBar.open('Error en la creación', 'Cerrar', { duration: 3000 })
      );
    } else {

      this.snackBar.open('Completa todos los campos', 'Cerrar', { duration: 3000 });
    }
    window.location.reload()
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }
}

