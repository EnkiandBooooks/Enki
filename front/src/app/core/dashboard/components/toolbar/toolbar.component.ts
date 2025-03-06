
import { Component, ChangeDetectorRef, signal,Input, ViewChild, ElementRef, HostListener  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../../../auth/components/profile/profile.component';
import { HomedashComponent } from '../homedash/homedash.component';
import { LibraryComponent } from '../library/library.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';
import { CreatecommunityComponent } from '../workspace/createcommunity/createcommunity.component';
import { TimelineComponent } from '../workspace/timeline/timeline.component';
import { CommentboxComponent } from '../workspace/commentbox/commentbox.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { LoadingService } from '../../../../shared/services/loading.service';
import { CommunitylistComponent } from '../communitylist/communitylist.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ProfileComponent,
    HomedashComponent,
    CreatecommunityComponent,
    TimelineComponent, // Importa el componente standalone directamente
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDivider,
    MatMenuModule,
    LibraryComponent,
    MatCard,
    CommentboxComponent,
    WorkspaceComponent,
    RouterLink,
    RouterOutlet,
    CommunitylistComponent,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  categories = ['Fantasy', 'Manga', 'History', 'Comic', 'Fiction', 'Novels', 'Literature', 'Science'];
  selected: string[] = [];
  @Input() currentSection = "";
  search: string = '';

  constructor(private categoryService: CategoryService) {}

  toggleCategory(event: any, category: string): void {
    if (event.source._checked) {
      this.selected.push(category);
    } else {
      this.selected = this.selected.filter((c) => c !== category);
    }
    this.categoryService.updateCategories(this.selected); // Actualiza las categorías en el servicio
  }
  updateSearchValue(search: string): void {
    this.categoryService.updateSearch(search);
  }

  showArrows: boolean = false;
  ngAfterViewInit(): void {
    // Se usa setTimeout para asegurarse de que se hayan aplicado los estilos
    setTimeout(() => {
      this.checkOverflow();
    });
  }

  ngAfterViewChecked(): void {
    // Se llama en cada ciclo de detección de cambios
    this.checkOverflow();
  }
  // Detecta cambios en el tamaño de la ventana
  @HostListener('window:resize')
  onResize(): void {
    this.checkOverflow();
  }

  // Método para comprobar si el contenedor de categorías tiene overflow
  public checkOverflow(): void {
    if (this.categoriesContainer && this.categoriesContainer.nativeElement) {
      const container = this.categoriesContainer.nativeElement;
      this.showArrows = container.scrollWidth > container.clientWidth;
    }
  }


  @ViewChild('categoriesContainer', { static: false })
  categoriesContainer!: ElementRef;
  // Método para desplazar a la izquierda
  scrollLeft(): void {
    this.categoriesContainer.nativeElement.scrollBy({
      left: -150,
      behavior: 'smooth'
    });
  }

  // Método para desplazar a la derecha
  scrollRight(): void {
    this.categoriesContainer.nativeElement.scrollBy({
      left: 150,
      behavior: 'smooth'
    });
  }
}




