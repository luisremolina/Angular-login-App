import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoresComponent } from './componentes/autores/autores.component';
import { BooksComponent } from './componentes/books/books.component';
import { HomeComponent } from './componentes/home/home.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { TarjetaAutoresComponent } from './componentes/tarjeta-autores/tarjeta-autores.component';
import { TarjetaBooksComponent } from './componentes/tarjeta-books/tarjeta-books.component';
import { AuthGuard } from './guard/Auth.guard';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'lista', component: LibrosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'autores', component: AutoresComponent, canActivate: [AuthGuard] },
  { path: 'vista-autores', component: TarjetaAutoresComponent, canActivate: [AuthGuard] },
  { path: 'vista-books', component: TarjetaBooksComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
