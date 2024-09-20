import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {


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

  LogIn(body: any):Observable<any>{
    console.log("Función para logearte.")
    return this.http.post(`http://localhost:1234/login/`, body)
  }

  resetPswd(body: any):Observable<any>{
    console.log("Función para enviar correo.")
    return this.http.post(`http://localhost:1234/resetPswd/`, body)
  }
}

