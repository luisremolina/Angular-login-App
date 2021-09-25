import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoresService } from 'src/app/services/autores.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-autor-dialog',
  templateUrl: './autor-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      .margen{
        margin-bottom: 10px;
      }
      label{
        color: rgba(0,0,0, .6);
        /* color: blue; */
      }

    `,
  ],
})
export class AutorDialogComponent implements OnInit {
  autorSuscripcion: Subscription;
  imgFoto: string;
  imgLogo: string;
  constructor(private autorServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  guardarAutor(form: NgForm) {
    const nombreCompleto = form.value.nombre + ' ' + form.value.apellido;
    console.log("antes del if");
    console.log(form.valid);
    if (form.valid) {
      console.log("entro al valid");
      const AutorRequest = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        gradoAcademico: form.value.gradoAcademico,
        nombreCompleto: nombreCompleto,
        imgLogo: this.imgLogo,
        imgFoto: this.imgFoto,
        genero: form.value.genero

      }

      this.autorServices.addAutor(AutorRequest);
      this.dialog.closeAll();
      // this.autorSuscripcion = this.autorServices.getActualListener().subscribe(() => {
      //   this.dialog.closeAll();
      // });
    }
  }

  obtenerImagen(event):any{
    console.log(event.target.files[0].name);
    this.imgFoto = "assets/img/" + event.target.files[0].name;
  }

  obtenerLogo(event):any{
    console.log(event.target.files[0].name);
    this.imgLogo = "assets/img/" + event.target.files[0].name;
  }




}
