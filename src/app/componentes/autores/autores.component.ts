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
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { AutorDialogEditComponent } from './autor-dialog-edit/autor-dialog-edit.component';

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
  inicio = 0;
  fin = 200;
  verOption = "Ver más...";

  desplegarColumnas = ['imgFoto', 'nombreCompleto', 'ocupacion', 'descripcion', 'obrasDestacadas', 'opciones'];
  dataSource = new MatTableDataSource<Autor>();
  private autoresSuscripcion = new Subscription;

  constructor(private autoresServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
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
        Swal.close();
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
    // console.log(item);
    const dialogRef = this.dialog.open(AutorDialogEditComponent, {
      width: '550px',
      data: {
        _id: item._id,
        nombreCompleto: item.nombreCompleto,
        nacionalidad: item.nacionalidad,
        descripcion: item.descripcion,
        ocupacion: item.ocupacion,
        imgFoto: item.imgFoto,
        obrasDestacadas: item.obrasDestacadas,
        genero: item.genero
      }
    });
    dialogRef.afterClosed()
      .subscribe(() => {
        this.autoresServices.getAutorPagination(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
      });
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

  verDescripcion(element) {

    return element.descripcion.length;

  }

  eliminarAutor(element) {

    Swal.fire({
      title: 'Deseas eliminar el autor: ' + element.nombreCompleto,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.autoresServices.deleteAutor(element._id);
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
            Swal.close();
          });
        this.dialog.closeAll();
        Swal.fire('Se ha eliminado correctamente el autor!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los cambion no fueron registrados', '', 'info')
        this.dialog.closeAll();
      }
    });
  }
}
