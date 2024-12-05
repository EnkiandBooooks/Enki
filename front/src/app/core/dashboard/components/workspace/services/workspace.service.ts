import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class workspaceService {

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

    getInfoWorkspace(body: any):Observable<any>{
      console.log("RUta: ", `${this.url}/get/${body}`)
      return this.http.get(`${this.url}/get/${body}`)
    }

    recoverComments(body:any):Observable<any>{
      return this.http.post(`${this.url}/comments/get`, body)
    }
    getWorkspaceUsers(id:string):Observable<any>{
      console.log("Holi"+`${this.url}/listUsers/${id}`+"Adiosi");
      return this.http.get(`${this.url}/listUsers/${id}`);
    }
}