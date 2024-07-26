import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPrimerloginComponent } from './mi-primerlogin/mi-primerlogin.component';
import { MiSegundologinComponent } from './mi-segundologin/mi-segundologin.component';
import { MiTercerloginComponent } from './mi-tercerlogin/mi-tercerlogin.component';
import { MiCuartologinComponent } from './mi-cuartologin/mi-cuartologin.component';

const routes: Routes = [
  { path: 'mi-primerlogin', component: MiPrimerloginComponent },
  { path: 'mi-segundologin', component: MiSegundologinComponent },
  {path:'mi-tercerlogin', component: MiTercerloginComponent},
  {path:'mi-cuartologin', component:MiCuartologinComponent},
  { path: '', redirectTo: '/mi-primerlogin', pathMatch: 'full' }  // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
