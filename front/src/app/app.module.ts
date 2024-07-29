import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiPrimerloginComponent } from './mi-primerlogin/mi-primerlogin.component';
import { MiSegundologinComponent } from './mi-segundologin/mi-segundologin.component';
import { MiTercerloginComponent } from './mi-tercerlogin/mi-tercerlogin.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MiCuartologinComponent } from './mi-cuartologin/mi-cuartologin.component'; // Importa FormsModule
import { provideHttpClient, withFetch } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MiPrimerloginComponent,
    MiSegundologinComponent,
    MiTercerloginComponent,
    MiCuartologinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
