import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';
import { AutorDialogComponent } from './autor-dialog/autor-dialog.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styles: [
    `
        #btn-agg {
        right: 45px;
        bottom: 45px;
        left: auto;
        position: absolute;
    }
`
  ]
})
export class AutoresComponent implements OnInit, OnDestroy {

  desplegarColumnas = ['nombre', 'apellido', 'gradoAcademico'];
  dataSource = new MatTableDataSource<Autor>();
  private autoresSuscripcion = new Subscription;

  constructor(private autoresServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // this.dataSource.data = this.autoresServices.getAutores();
    this.autoresServices.getAutores();
    this.autoresSuscripcion = this.autoresServices.getActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
  }
  ngOnDestroy() {
    this.autoresSuscripcion.unsubscribe();
  }

  abrirDialog() {
    const dialogRef = this.dialog.open(AutorDialogComponent, {
      width: '550px',
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.autoresServices.getAutores();
        this.autoresSuscripcion = this.autoresServices.getActualListener()
      .subscribe((autores: Autor[]) => {
        this.dataSource.data = autores;
      });
      });
  }

}
