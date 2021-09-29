import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class BookDialogComponent implements OnInit, OnDestroy {
  SelectAutor: string;
  SelectAutorTexto: string;
  fechaPublicacion: string;
  autores: Autor[] = [];
  autorSuscripcion: Subscription;
  imgFoto: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  constructor(
    private bookServices: BooksService,
    private dialog: MatDialog,
    private autorService: AutoresService
  ) { }

  guardarLibro(form: NgForm): void {
    // console.log(form.value);
    if (form.valid) {
      const autorRequest = {
        id: this.SelectAutor,
        nombreCompleto: this.SelectAutorTexto,
      };
      const libroRequest = {
        id: null,
        descripcion: form.value.descripcion,
        titulo: form.value.titulo,
        autor: autorRequest,
        precio: parseInt(form.value.precio),
        fechaPublicacion: new Date(this.fechaPublicacion),
        imgFoto: this.imgFoto
      };
      this.bookServices.addBook(libroRequest);
      this.autorSuscripcion = this.bookServices.addBookListener().subscribe(() => {
        this.dialog.closeAll();
      });
    }
  }

  obtenerImagen(event): any{
    this.imgFoto = 'assets/img/' + event.target.files[0].name;
  }

  selected(event: MatSelectChange): void {
    this.SelectAutorTexto = (event.source.selected as MatOption).viewValue;
    // console.log(this.SelectAutorTexto);
  }

  ngOnInit(): void {
    this.autorService.getAutores();
    this.autorSuscripcion = this.autorService.getActualListener().subscribe((autores: Autor[]) => {
      this.autores = autores;
    });
  }
  ngOnDestroy(): void {
    this.autorSuscripcion.unsubscribe();
  }
}
