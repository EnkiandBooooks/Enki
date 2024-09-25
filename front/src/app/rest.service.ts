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
    return this.http.post(`http://localhost:1234/mail/`, body)
  }

  comprobarCodigo(body: any):Observable<any> {
    console.log("Función para comprobar codigos.")
    return this.http.post(`http://localhost:1234/mail/codigo/`, body)
  }

  sendData(body: any):Observable<any>{
    console.log(body)
    return this.http.post(`http://localhost:1234/register/`, body)
  }

  getData(){
    return firstValueFrom(
      this.http.get<any>(`http://localhost:1234/data/`)
    )
  }

  LogIn(body: any):Observable<any>{
    console.log("Función para logearte.")
    return this.http.post(`http://localhost:1234/login/`, body)
  }

  resetPswd(body: any):Observable<any>{
    console.log("Función para rehacer correo.")
    return this.http.post(`http://localhost:1234/resetPswd/`, body)
  }

  refreshToken() {
    const refresh_token = this.getRefreshToken();
    const body = {refreshToken: refresh_token};
    return this.http.post<any>(`http://localhost:1234/refresh`, body);
  }

  getAccesToken() {
    return this.cookieService.get("access_token");
  }

  getRefreshToken() {
    return this.cookieService.get("refresh_token");
  }
}