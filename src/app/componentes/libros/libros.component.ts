import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [`
    form { margin: 20px}
  `
  ]
})
export class LibrosComponent implements OnInit, OnDestroy {

  libros = []
  descripcion = "lorem ipsum cualquier ddslakldkksjalkjsadlkj"
  private libroSuscripcion = new Subscription;

  constructor( private librosServices:LibrosService ) { }

  ngOnInit(): void {
    this.libros = this.librosServices.getLibros();
    this.libroSuscripcion = this.librosServices.librosSubject.subscribe( () =>{
      this.libros = this.librosServices.getLibros();
    });
  }

  ngOnDestroy():void{
    this.libroSuscripcion.unsubscribe();
  }

  // borrar(libro){
    // this.libros = this.libros.filter( p => p !== libro);
    // this.librosServices.eliminarLibro(libro);
  // }

  guardar(form){
    // console.log(form.value.libro);
    if (form.valid) {
      // this.libros.push(form.value.libro);
      this.librosServices.guardarLibro(form.value.libro);
    }
  }

}
