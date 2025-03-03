import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { workspaceService } from '../services/workspace.service';
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
    NgIf
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
  previewText: string = '';
  previewImage: string | null = null;
  previewPrivacy: string = 'Public';
  previewStamps: number = 0;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private workspaceService: workspaceService,
    private booksService: BooksService,
  ) {
    this.communityForm = this.fb.group({
      communityName: ['', Validators.required],
      book: ['', Validators.required],
      stamps: [0, [Validators.required, Validators.min(1)]],
      privacy: ['public', Validators.required]
    });
  }
  
  ngOnInit() {
    this.previewImage = 'images/default-book.jpg'
    this.booksService.getBooks()
      .subscribe((res) => {
        this.books = Object.entries(res);
        this.options = this.books.map((book: any) => book[1].title);
        this.filteredOptions = this.options.slice();
      });

    this.communityForm.get('communityName')?.valueChanges.subscribe(value => {
      this.previewText = value || '';
    });

    this.communityForm.get('privacy')?.valueChanges.subscribe(value => {
      this.previewPrivacy = value.charAt(0).toUpperCase() + value.slice(1);this.previewPrivacy = value || 'Public';
    });

    this.communityForm.get('stamps')?.valueChanges.subscribe(value => {
      this.previewStamps = value || 0;
    });

    this.communityForm.get('book')?.valueChanges.subscribe(value => {
      this.onBookSelected(value);
    });
  }

  onSubmit(): void {
    if (this.communityForm.valid) {
      this.workspaceService.createWorkspace(this.communityForm.value).subscribe(
        () => this.snackBar.open('Comunidad creada', 'Cerrar', { duration: 3000 }),
        (error: any) => this.snackBar.open('Error en la creación', 'Cerrar', { duration: 3000 })
      );
    } else {
      this.snackBar.open('Completa todos los campos', 'Cerrar', { duration: 3000 });
    }
    window.location.reload();
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  onBookSelected(bookTitle: string): void {
    if (!bookTitle) {
      this.previewImage = 'images/default-book.jpg';
      return;
    }
    this.getBookCover(bookTitle);
  }

  getBookCover(bookTitle: string): void {
    const book = this.books.find((b: any) => b[1].title === bookTitle);
    if (book) {
      this.previewImage = book[1].largeThumbnail; 
    } else {
      this.previewImage = null;
    }
  }
}

