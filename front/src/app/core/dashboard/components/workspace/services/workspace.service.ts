import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private http = inject(HttpClient)

    private url = 'http://localhost:1234/workspace'

    createWorkspace(body: any):Observable<any>{
      return this.http.post(`${this.url}/create/`, body)
    }

    createComment(body: any):Observable<any>{
      return this.http.post(`${this.url}/comments/create`, body)
    }
    deleteComment(body: any): Observable<any>{
      return this.http.post(`${this.url}/comments/delete`, body)
    }

    recoverComments(body:any):Observable<any>{
      return this.http.post(`${this.url}/comments/get`, body)
      
    }
    Timelineworkspace(body: any):Observable<any>{
      console.log("Función para recoger info timeline.")
      return this.http.post(`${this.url}`, body)
      console.log(this.url)
    }
}