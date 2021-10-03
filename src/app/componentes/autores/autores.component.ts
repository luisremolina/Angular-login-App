import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { PaginationAutors } from 'src/app/interfaces/paginationAutors.model';
import { AutoresService } from 'src/app/services/autores.service';
import { AutorDialogComponent } from './autor-dialog/autor-dialog.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit, OnDestroy, AfterViewInit {
  totalLibros = 0;
  librosPorPagina = 5;
  paginaCombo = [2, 5, 10, 15];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = {};
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  timeOut: any = null;

  desplegarColumnas = ['imgFogo' , 'nombreCompleto', 'ocupacion', 'descripcion', 'obrasDestacadas', 'opciones'];
  dataSource = new MatTableDataSource<Autor>();
  private autoresSuscripcion = new Subscription;

  constructor(private autoresServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.autoresServices.getAutorPagination(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
    this.autoresSuscripcion = this.autoresServices
      .getActualListenerPagination()
      .subscribe((pagination: PaginationAutors) => {
        this.dataSource = new MatTableDataSource<Autor>(pagination.data);
        this.totalLibros = pagination.totalRows;
      });
  }

  ngOnDestroy(): void {
    this.autoresSuscripcion.unsubscribe();
  }

  abrirDialog(): void {
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

  abrirDialogEdit(item): void {
    const dialogRef = this.dialog.open(AutorDialogComponent, {
      width: '550px',
      data: {
        _id: item._id,
        nombreCompleto: item.autor,
        descripcion: item.descripcion,
        imgFoto: item.imgFoto,
      }
    });
    // dialogRef.afterClosed()
    // .subscribe(() => {
    //   this.autoresServices.getAutores();
    //   this.autoresSuscripcion = this.autoresServices.getActualListener()
    //   .subscribe((autores: Autor[]) => {
    //   this.dataSource.data = autores;
    // });
    // });
  }

  filtrar(event: any): void {
    const $this = this;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (event.keyCode !== 13) {
        const filterValueLocal = {
          propiedad: 'nombreCompleto',
          valor: event.target.value
        };
        $this.filterValue = filterValueLocal;

        $this.autoresServices.getAutorPagination(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );

      }
    }, 1000);
  }

  eventoPaginador(event: PageEvent): void {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.autoresServices.getAutorPagination(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );
  }

  ordenarColumna(event): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.autoresServices.getAutorPagination(
      this.librosPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

}
