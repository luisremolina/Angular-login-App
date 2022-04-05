import { Component, OnDestroy, Output,EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../../../services/seguridad.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

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
