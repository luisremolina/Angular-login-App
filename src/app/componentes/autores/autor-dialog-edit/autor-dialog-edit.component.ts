import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Genero } from '../autor-dialog/autor-dialog.component';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { AutoresService } from 'src/app/services/autores.service';

@Component({
  selector: 'app-autor-dialog-edit',
  templateUrl: './autor-dialog-edit.component.html',
  styleUrls: ['./autor-dialog-edit.component.css']
})
export class AutorDialogEditComponent implements OnInit {

  SelectAutor: string;
  SelectAutorTexto: string;
  autorSuscripcion: Subscription;
  imgFoto: string;
  fechaPublicacion: string;
  generos = [];
  autor;
  generosInput: string;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor( private autoresServices: AutoresService, private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { _id, nombreCompleto, nacionalidad, descripcion, ocupacion, imgFoto, obrasDestacadas, genero }) { }

  ngOnInit(): void {
    this.generos = this.data.genero;
  }

  guardarAutor(form){
    if (!form.value.imgFoto) {
      this.imgFoto =  this.data.imgFoto;
      // this.autor = form.value.autor;
    }
    if (form.valid) {
      this.accionSaved(form);
    }
  }

  accionSaved(form){
    Swal.fire({
      title: 'Deseas guardar los cambios?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
    }).then((result) => {

      if (result.isConfirmed) {

        const AutorRequest = {
          nombreCompleto: form.value.nombreCompleto,
          nacionalidad: form.value.nacionalidad,
          descripcion: form.value.descripcion,
          ocupacion: form.value.ocupacion,
          imgFoto: this.imgFoto,
          obrasDestacadas: form.value.obrasDestacadas,
          genero: this.generos
        }

        this.autoresServices.updateAutor(this.data._id, AutorRequest);
        this.autorSuscripcion = this.autoresServices.getActualListener().subscribe(() => {
          this.dialog.closeAll();
        });
        Swal.fire('Actualizado correctamente!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los cambion no fueron registrados', '', 'info')
        this.dialog.closeAll();
      }
    });
  }

  obtenerImagen(event){
    this.imgFoto = "assets/img/" + event.target.files[0].name;
    console.log(this.imgFoto);
  }

  // METODOS PARA LA CHIP DE LOS GENEROS

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.generos.push({ name: value });
      this.generosInput = "";
    }

    // Clear the input value
    // event.chipInput!.clear();
    this.generosInput = "";
  }

  remove(fruit: Genero): void {
    const index = this.generos.indexOf(fruit);

    if (index >= 0) {
      this.generos.splice(index, 1);
    }
  }
}


