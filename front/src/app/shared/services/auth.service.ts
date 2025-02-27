import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private loadingService = inject(LoadingService);

  private url = 'http://localhost:1234/users';

  enviarMail(body: any):Observable<any>{
    return this.http.post(`${this.url}/mail/`, body)
  }

  comprobarCodigo(body: any):Observable<any> {
    console.log("Función para comprobar codigos.")
    return this.http.post(`${this.url}/mail/codigo/`, body)
  }

  sendData(body: any):Observable<any>{
    console.log(body);
    return this.http.post(`${this.url}/register/`, body)
  }

  getData():Observable<any>{

      return this.http.get(`${this.url}/data/`);

  }
  postData(body:any):Observable<any>{

    return this.http.post(`${this.url}/data/`,body);

  }

  LogIn(body: any):Observable<any>{
    console.log("Función para logearte.")
    return this.http.post(`${this.url}/login/`, body)
  }

  resetPswd(body: any):Observable<any>{
    console.log("Función para rehacer correo.")
    return this.http.post(`${this.url}/resetPswd/`, body)
  }

  resetPswd3(body: any, token: string): Observable<any> {
    console.log("Función cambiar contraseña.");
    return this.http.post(`${this.url}/resetPswd/${token}`, body);
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

 
}
