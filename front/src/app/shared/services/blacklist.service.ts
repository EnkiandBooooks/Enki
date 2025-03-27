import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlacklistService {

  private http = inject(HttpClient);

  private url = 'http://localhost:1234/blacklistValidation';

  validateText(body: any):Observable<any>{
    return this.http.post(this.url, body)
  }
}
