import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
// import { Books } from 'src/app/interfaces/books.model';
import { AutoresService } from 'src/app/services/autores.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-books-dialog-edit',
  templateUrl: './books-dialog-edit.component.html',
  styleUrls: ['./books-dialog-edit.component.css']
})
export class BooksDialogEditComponent implements OnInit {
  SelectAutor: string;
  SelectAutorTexto: string;
  autorSuscripcion: Subscription;
  autores: Autor [] = [];
  imgFoto: string;
  fechaPublicacion: string;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;



  constructor(
    private bookServices: BooksService,
    private dialog: MatDialog,
    private autorService: AutoresService,
    public dialogRef: MatDialogRef<BooksDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { _id, titulo, descripcion, autor, fechaPublicacion, imgFoto, precio }
  ) {

  }

  sweetAlert(form: NgForm){
    Swal.fire({
      title: 'Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {

      if (result.isConfirmed) {
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
          fechaPublicacion: new Date(this.data.fechaPublicacion),
          imgFoto: this.imgFoto
        };
        this.bookServices.updateBook(this.data._id, libroRequest);
        this.autorSuscripcion = this.bookServices.addBookListener().subscribe(() => {
          this.dialog.closeAll();
        });
        Swal.fire('Actualizado correctamente!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los cambion no fueron registrados', '', 'info')
        this.dialog.closeAll();
      }
    });
  }

  editarLibro(form: NgForm): void {

    if (!form.value.imgFoto) {
      this.imgFoto =  this.data.imgFoto;

    }
    if (form.valid) {
      this.sweetAlert(form);
    }
  }

  selected(event: MatSelectChange): void {
    this.SelectAutorTexto = (event.source.selected as MatOption).viewValue;
    // console.log(this.SelectAutorTexto);
  }

  obtenerImagen(event): any{
    this.imgFoto = "assets/img/" + event.target.files[0].name;
    console.log(this.imgFoto);
  }


  ngOnInit(): void {
    this.autorService.getAutores();
    this.autorSuscripcion = this.autorService.getActualListener().subscribe((autores: Autor[]) => {
      this.autores = autores;
    });
  }

}
