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

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  totalLibros = 0;
  librosPorPagina = 2;
  paginaCombo = [1, 2, 5, 10];
  paginaActual = 1;
  sort = 'titulo';
  sortDirection = 'asc';
  filterValue = {};

  bookData: Books[] = [];
  private bookSuscripcion: Subscription;
  desplegarColumnas = ['titulo', 'descripcion', 'autor', 'precio'];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) ordenamiento: MatSort;
  @ViewChild(MatPaginator) paginacion: MatPaginator;
  timeOut: any = null;

  constructor(private bookService: BooksService, private dialog: MatDialog) { }

  filtrar(event: any) {
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
  abrirDialog() {
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
  ordenarColumna(event) {
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
      });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento;
    this.dataSource.paginator = this.paginacion;
  }
  ngOnDestroy() {
    this.bookSuscripcion.unsubscribe();
  }
}
