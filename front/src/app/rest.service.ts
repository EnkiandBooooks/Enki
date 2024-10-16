import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  cookieService = inject(CookieService)
  constructor(private http: HttpClient) { }

  enviarMail(body: any):Observable<any>{
    console.log("Función para enviar correo.")
    return this.http.post(`http://localhost:1234/users/mail/`, body)
  }

  comprobarCodigo(body: any):Observable<any> {
    console.log("Función para comprobar codigos.")
    return this.http.post(`http://localhost:1234/users/mail/codigo/`, body)
  }

  sendData(body: any):Observable<any>{
    console.log(body)
    return this.http.post(`http://localhost:1234/users/register/`, body)
  }

  getData():Observable<any>{

      return this.http.get(`http://localhost:1234/users/data/`);

  }
  postData(body:any):Observable<any>{

    return this.http.post(`http://localhost:1234/users/data/`,body);

  }

  LogIn(body: any):Observable<any>{
    console.log("Función para logearte.")
    return this.http.post(`http://localhost:1234/users/login/`, body)
  }

  resetPswd(body: any):Observable<any>{
    console.log("Función para rehacer correo.")
    return this.http.post(`http://localhost:1234/users/resetPswd/`, body)
  }

  resetPswd3(body: any, token: string): Observable<any> {
    console.log("Función cambiar contraseña.");
    return this.http.post(`http://localhost:1234/users/resetPswd/${token}`, body);
  }

  refreshToken() {
    const refresh_token = this.getRefreshToken();
    const body = {refreshToken: refresh_token};
    return this.http.post<any>(`http://localhost:1234/users/refresh`, body);
  }

  getAccesToken() {
    return this.cookieService.get("access_token");
  }

  getRefreshToken() {
    return this.cookieService.get("refresh_token");
  }

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

