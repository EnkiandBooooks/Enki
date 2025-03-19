import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';  // Importación para cerrar el dialog
import { workspaceService } from '../services/workspace.service';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

interface CommunityData {
  communityName: string;
  book: string;
  stamps: number;
  privacy: string;
  icon: string;
}

@Component({
  selector: 'app-createcommunity',
  standalone: true,
  encapsulation: ViewEncapsulation.None, // Permite que los estilos se apliquen globalmente
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule, // Se añade para usar <mat-icon>
    AsyncPipe,
    NgIf,
    CommonModule,
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


  previewBook: string = '';
  previewText: string = '';
  previewPrivacy: string = 'Public';
  previewStamps: number = 0;

  // Íconos disponibles para seleccionar
  communityIcons: string[] = [
    'images/Enki_Icon_Red.png',
    'images/Enki_Icon_Green.png',
    'images/Enki_Icon_Purple.png',
    'images/Enki_Icon_Black.png',
    'images/Enki_Icon_White.png',
    'images/Enki_Icon_Blue.png'
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private workspaceService: workspaceService,
    private booksService: BooksService,
    private router: Router,
    public dialogRef: MatDialogRef<CreatecommunityComponent>
  ) {
    this.communityForm = this.fb.group({
      communityName: ['', Validators.required],
      book: ['', Validators.required],
      stamps: [0, [Validators.required, Validators.min(1)]],
      privacy: ['public', Validators.required],
      icon: ['images/default-book.jpg']
    });
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe((res) => {
      this.books = Object.entries(res);
      this.options = this.books.map((book: any) => book[1].title);
      this.filteredOptions = this.options.slice();
    });

    this.communityForm.get('communityName')?.valueChanges.subscribe(value => {
      this.previewText = value || '';
    });

    this.communityForm.get('book')?.valueChanges.subscribe(value => {
      this.previewBook = value || '';
    })

    this.communityForm.get('privacy')?.valueChanges.subscribe(value => {
      this.previewPrivacy = value ? (value.charAt(0).toUpperCase() + value.slice(1)) : 'Public';
    });

    this.communityForm.get('stamps')?.valueChanges.subscribe(value => {
      this.previewStamps = value || 0;
    });
  }

  onSubmit(): void {
    if (this.communityForm.valid) {
      this.workspaceService.createWorkspace(this.communityForm.value).subscribe(
        () => this.snackBar.open('Comunidad creada', 'Cerrar', { duration: 3000 }),
        (error: any) => this.snackBar.open('Error en la creación', 'Cerrar', { duration: 3000 })
      );
      this.router.navigate(['/dashboard/home']).then(() => {
        window.location.reload();
      });
    } else {
      this.snackBar.open('Completa todos los campos', 'Cerrar', { duration: 3000 });
    }
  }

  filter(): void {
    const filterValue = this.input.nativeElement.value.toLowerCase();
    this.filteredOptions = this.options.filter(o => o.toLowerCase().includes(filterValue));
  }

  selectIcon(icon: string): void {
    this.communityForm.patchValue({ icon });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
