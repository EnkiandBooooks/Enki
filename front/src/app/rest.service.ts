import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(private http: HttpClient) { }

  send(body: any):Observable<any>{
    console.log(body)
    return this.http.post(`http://localhost:1234/mail/`, body)
  }

  receive():Observable<any> {
    console.log(this.http.get(`http://localhost:1234/mail/codigo/`))
    return this.http.get(`http://localhost:1234/mail/codigo/`)
  }

  sendData(body: any):Observable<any>{
    console.log(body)
    return this.http.post(`http://localhost:1234/register/`, body)
  }
}
