import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styles: [`

      .libro{
        border: 2px solid blue;
        padding: 10px;
        background: green;
      }
  `
  ]
})
export class LibroComponent {

  @Input() titulo: string;
  @Input() descripcion: string;
  // @Output() libroClicked = new EventEmitter;

  constructor(private librosServices:LibrosService) { }

  borrar(){
    // this.libroClicked.emit();
    this.librosServices.eliminarLibro(this.titulo);
    // console.log(this.libroClicked.emit());
  }

}
