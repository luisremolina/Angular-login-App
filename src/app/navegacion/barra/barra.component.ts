import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../services/seguridad.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit, OnDestroy {

  @Output() menuToggle = new EventEmitter();
  userLogueado: boolean;
  usuarioSuscripcion: Subscription;

  constructor( private seguridadServicio: SeguridadService ) { }

  ngOnInit(): void {
    this.usuarioSuscripcion =  this.seguridadServicio.seguridadCambio.subscribe( status => {
      this.userLogueado = status;
    });
  }

  abrirMenu(){
    this.menuToggle.emit();
  }
  cerrarSesion(){
    this.seguridadServicio.cerrarSesion();
    
  }
  ngOnDestroy(): void {
    this.usuarioSuscripcion.unsubscribe();
  }

}
