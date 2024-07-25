import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiPrimerloginComponent } from './mi-primerlogin/mi-primerlogin.component';
import { MiSegundologinComponent } from './mi-segundologin/mi-segundologin.component';
import { MiTercerloginComponent } from './mi-tercerlogin/mi-tercerlogin.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule


@NgModule({
  declarations: [
    AppComponent,
    MiPrimerloginComponent,
    MiSegundologinComponent,
    MiTercerloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
