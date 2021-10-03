import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-tarjeta-autores',
  templateUrl: './tarjeta-autores.component.html',
  styleUrls: ['./tarjeta-autores.component.scss']
})
export class TarjetaAutoresComponent implements OnInit, OnDestroy {

  autores: Autor[] = [];
  visible: string;
  positionTs = true;
  private autoresSuscripcion = new Subscription;

  constructor(private autoresService: AutoresService) { }

  ngOnInit(): void {
    this.autoresService.getAutores();
    this.autoresService.getActualListener().subscribe( autores =>{
      this.autores = autores;
    });
  }
  ngOnDestroy(): void {
   this.autoresSuscripcion.unsubscribe();
  }

  mostrar(autor, f){
    const positionCard = f.getBoundingClientRect().x;
    const tamaño = screen.width/2;
    if (positionCard > tamaño) {
      this.positionTs = false;
    }else{
      this.positionTs = true;
    }
    this.visible = autor._id;
  }

  mostrar2(autor, f){
    const positionCard = f.getBoundingClientRect().x;
    let constante = true;
    $(document).ready(function($){
      var ventana_ancho = $(window).width();
      if (positionCard > ventana_ancho/2) {
        console.log("si es true");
        constante = false;
      }else{
        constante = true;
      }
    });
    this.positionTs = constante;
    this.visible = autor._id;
  }

  salir(){
    this.visible = "";
  }

  ancho() {
    $(document).ready(function($){
      var ventana_ancho = $(window).width();
      console.log( "Ancho de la ventana " + ventana_ancho);
    });
  }


}
