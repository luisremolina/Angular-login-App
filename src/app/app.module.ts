import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibroComponent } from './componentes/libro/libro.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './angular-material/material.module';
import { LoginComponent } from './seguridad/login/login.component';
import { RegistrarComponent } from './seguridad/registrar/registrar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarraComponent } from './navegacion/barra/barra.component';
import { MenuListaComponent } from './navegacion/menu-lista/menu-lista.component';
import { BooksComponent } from './componentes/books/books.component';
import { BookDialogComponent } from './componentes/books/book-dialog/book-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AutoresComponent } from './componentes/autores/autores.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SeguridadInterceptor } from './seguridad/seguridad-interceptor';
import { AutorDialogComponent } from './componentes/autores/autor-dialog/autor-dialog.component';
import { TarjetaAutoresComponent } from './componentes/tarjeta-autores/tarjeta-autores.component';
import { TarjetaBooksComponent } from './componentes/tarjeta-books/tarjeta-books.component';
import { NoimagePipe } from './pipes/noimage.pipe';
import { BooksDialogEditComponent } from './componentes/books/books-dialog-edit/books-dialog-edit.component';
import { TarjetaPrototypeComponent } from './componentes/tarjeta-prototype/tarjeta-prototype.component';
import { DescriptionPipe } from './pipes/description.pipe';
import { AutorDialogEditComponent } from './componentes/autores/autor-dialog-edit/autor-dialog-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LibroComponent,
    LibrosComponent,
    HomeComponent,
    LoginComponent,
    RegistrarComponent,
    BarraComponent,
    MenuListaComponent,
    BooksComponent,
    BookDialogComponent,
    AutoresComponent,
    AutorDialogComponent,
    TarjetaAutoresComponent,
    TarjetaBooksComponent,
    NoimagePipe,
    BooksDialogEditComponent,
    TarjetaPrototypeComponent,
    DescriptionPipe,
    AutorDialogEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SeguridadInterceptor, multi: true },,{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
