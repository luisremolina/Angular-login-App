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
    `,
  ],
})
export class AutorDialogComponent implements OnInit {
  autorSuscripcion: Subscription;
  constructor(private autorServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  guardarAutor(form: NgForm) {
    // console.log(form.valid);
    const nombreCompleto = form.value.nombre + ' ' + form.value.apellido;

    if (form.valid) {
      const AutorRequest = {
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        gradoAcademico: form.value.gradoAcademico,
        nombreCompleto: nombreCompleto
      }

      this.autorServices.addAutor(AutorRequest);
      this.dialog.closeAll();
      // this.autorSuscripcion = this.autorServices.getActualListener().subscribe(() => {
      //   this.dialog.closeAll();
      // });
    }
  }



}
