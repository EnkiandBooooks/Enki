import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategoriesSource = new BehaviorSubject<string[]>([]);
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  updateCategories(categories: string[]) {
    this.selectedCategoriesSource.next(categories);
  }

  constructor() { }
}
