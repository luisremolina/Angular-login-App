import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styles: [
  ]
})
export class AutoresComponent implements OnInit, OnDestroy {

  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  private autoresSuscripcion = new Subscription;

  constructor(private autoresServices: AutoresService) { }

  ngOnInit(): void {
    // this.dataSource.data = this.autoresServices.getAutores();
    this.autoresServices.getAutores();
    this.autoresSuscripcion = this.autoresServices.getActualListener()
    .subscribe( (autores: Autor[]) =>{
      this.dataSource.data = autores;
    })
  }
  ngOnDestroy(){
    this.autoresSuscripcion.unsubscribe();
  }

}
