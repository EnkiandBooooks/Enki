
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-primerlogin',
  templateUrl: './mi-primerlogin.component.html',
  styleUrls: ['./mi-primerlogin.component.css']
})
export class MiPrimerloginComponent {

  constructor(private router: Router) { }

  onClick() {
    console.log();
    this.router.navigate(['/mi-segundologin']); // Usar ruta absoluta
  }
}
