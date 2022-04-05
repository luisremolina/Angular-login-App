import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-menu-lista',
  templateUrl: './menu-lista.component.html',
  styleUrls: ['./menu-lista.component.css']
})
export class MenuListaComponent implements OnInit, OnDestroy {

  @Output() menuClose = new EventEmitter();
  usuarioSuscripcion: Subscription;
  estadoUsuario: boolean;
  panelOpenState: boolean;
  constructor(private seguridadServicio: SeguridadService) {  }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.usuarioSuscripcion = this.seguridadServicio.seguridadCambio.subscribe(status =>{
      this.estadoUsuario = status;
    });
  }

  cerrarMenu(){
    this.menuClose.emit();
  }

  cerrarSesion(){
    this.cerrarMenu();
    this.seguridadServicio.cerrarSesion();
  }

  ngOnDestroy(){
    this.usuarioSuscripcion.unsubscribe();
  }

}
