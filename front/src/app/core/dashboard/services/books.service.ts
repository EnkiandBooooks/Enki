import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private http = inject(HttpClient);
  private url = 'http://localhost:1234/books'

  getBooks() {
    return this.http.get(`http://localhost:1234/books`);
  }

  getBooksFilter(filter:string) {
    return this.http.get(`http://localhost:1234/books${filter}`);
  }

  postCategory(categories: string[]): Observable<any>{
    return this.http.post<any>(`http://localhost:1234/users/library`, categories);
  }
}
