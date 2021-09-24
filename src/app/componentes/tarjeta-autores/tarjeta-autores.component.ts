import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-tarjeta-autores',
  templateUrl: './tarjeta-autores.component.html',
  styleUrls: ['./tarjeta-autores.component.css']
})
export class TarjetaAutoresComponent implements OnInit, OnDestroy {

  autores: Autor[] = [];
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

}
