import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  librosSubject = new Subject;
  private libros = ['Tales of demons and gods', 'hombre araña', 'encantados'];

  constructor() { }

  getLibros(){
    return [...this.libros];
  }

  eliminarLibro(libro:string){
    this.libros = this.libros.filter( p => p !== libro);
    this.librosSubject.next();
  }
  guardarLibro(libro:string){
    this.libros.push(libro);
    this.librosSubject.next();
  }



}
