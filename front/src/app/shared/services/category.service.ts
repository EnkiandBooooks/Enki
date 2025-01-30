import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private selectedCategoriesSource = new BehaviorSubject<string[]>([]);
  selectedCategories$ = this.selectedCategoriesSource.asObservable();

  private searchSource = new BehaviorSubject("");
  search$ = this.searchSource.asObservable();

  updateCategories(categories: string[]) {
    this.selectedCategoriesSource.next(categories);
  }

  updateSearch(search: string) {
    this.searchSource.next(search);
  }

  constructor() { }
}
