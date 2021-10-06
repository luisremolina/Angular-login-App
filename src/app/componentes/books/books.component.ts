import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PaginationBooks } from 'src/app/interfaces/paginationBooks.model';
import { Books } from '../../interfaces/books.model';
import { BooksService } from '../../services/books.service';
import { BookDialogComponent } from './book-dialog/book-dialog.component';
import { BooksDialogEditComponent } from './books-dialog-edit/books-dialog-edit.component';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  totalLibros = 0;
  librosPorPagina = 5;
  paginaCombo = [2, 5, 10, 15];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = {};
  fin = 100;

  generos: any [] = [];
  bookData: Books[] = [];
  private bookSuscripcion: Subscription;
  desplegarColumnas = ['imgFoto', 'titulo', 'descripcion', 'autor', 'precio', 'fechaPublicacion', 'opciones'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  timeOut: any = null;

  constructor(private bookService: BooksService, private dialog: MatDialog) { }

  filtrar(event: any): void {
    const $this = this;
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      if (event.keyCode != 13) {
        const filterValueLocal = {
          propiedad: 'titulo',
          valor: event.target.value
        };
        $this.filterValue = filterValueLocal;

        $this.bookService.getBooks(
          $this.librosPorPagina,
          $this.paginaActual,
          $this.sort,
          $this.sortDirection,
          filterValueLocal
        );

      }
    }, 1000);
  }

  abrirDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '550px',
    });
    dialogRef.afterClosed()
      .subscribe(() => {
        this.bookService.getBooks(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
      });
  }

  abrirDialogEdit(item): void {
    const dialogRef = this.dialog.open(BooksDialogEditComponent, {
      width: '550px',
      data: {
        _id: item._id,
        titulo: item.titulo,
        descripcion: item.descripcion,
        autor: item.autor,
        fechaPublicacion: item.fechaPublicacion,
        imgFoto: item.imgFoto,
        precio: item.precio
      }
    });
    dialogRef.afterClosed()
      .subscribe(() => {
        this.bookService.getBooks(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
      });
  }

  eventoPaginador(event: PageEvent): void {
    this.librosPorPagina = event.pageSize;
    this.paginaActual = event.pageIndex + 1;
    this.bookService.getBooks(
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
    this.bookService.getBooks(
      this.librosPorPagina,
      this.paginaActual,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  ngOnInit(): void {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.bookService.getBooks(
      this.librosPorPagina,
      this.paginaActual,
      this.sort,
      this.sortDirection,
      this.filterValue
    );

    this.bookService.getAllGeneros().then(
      (res:any) =>{
      this.generos = res;
    });
    this.bookSuscripcion = this.bookService
      .getActualListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalLibros = pagination.totalRows;
        Swal.close();
      });

  }

  deleteBook(element){
    Swal.fire({
      title: 'Deseas eliminar: ' + element.titulo,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
    }).then((result) => {

      if (result.isConfirmed) {
        this.bookService.deleteAutor(element._id);
        this.bookService.getBooks(
          this.librosPorPagina,
          this.paginaActual,
          this.sort,
          this.sortDirection,
          this.filterValue
        );
        this.bookSuscripcion = this.bookService
          .getActualListener()
          .subscribe((pagination: PaginationBooks) => {
            this.dataSource = new MatTableDataSource<Books>(pagination.data);
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


  ngAfterViewInit(): void {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }

  ngOnDestroy(): void {
    this.bookSuscripcion.unsubscribe();
  }
}
