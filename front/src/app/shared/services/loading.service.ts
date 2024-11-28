import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private timeoutDuration =  5000;

  isLoading$ = this.loadingSubject.asObservable();

  show() {
    console.log("Loadingservice funcionando MUY BIEN");
    this.loadingSubject.next(true);
  }

  hide(): void {
    setTimeout(() => {
      this.loadingSubject.next(false);
    }, this.timeoutDuration);
  }
}

