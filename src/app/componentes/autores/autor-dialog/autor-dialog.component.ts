import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutoresService } from 'src/app/services/autores.service';
import { MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

export interface Genero {
  name: string;
}

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
.example-chip-list {
  width: 100%;
}

    `,
  ],
})
export class AutorDialogComponent implements OnInit {
  autorSuscripcion: Subscription;
  imgFoto: string;
  imgLogo: string;
  generosInput: string;

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  generos: Genero[] = [
    { name: 'Novela' },
    { name: 'Manga' },
    { name: 'Cuento' },
  ];


  constructor(private autorServices: AutoresService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  guardarAutor(form: NgForm): void {

    if (form.valid) {
      const AutorRequest = {
        nombreCompleto: form.value.nombreCompleto,
        nacionalidad: form.value.nacionalidad,
        descripcion: form.value.descripcion,
        ocupacion: form.value.ocupacion,
        imgFoto: this.imgFoto,
        obrasDestacadas: form.value.obrasDestacadas,
        genero: this.generos
      }
      this.autorServices.addAutor(AutorRequest);
      this.dialog.closeAll();
    }

    // const nombreCompleto = form.value.nombre + ' ' + form.value.apellido;
    // console.log("antes del if");
    // console.log(form.valid);
    // if (form.valid) {
    //   console.log("entro al valid");
    //   const AutorRequest = {
    //     nombre: form.value.nombre,
    //     apellido: form.value.apellido,
    //     gradoAcademico: form.value.gradoAcademico,
    //     nombreCompleto: nombreCompleto,
    //     imgLogo: this.imgLogo,
    //     imgFoto: this.imgFoto,
    //     genero: form.value.genero

    //   }

    //   this.autorServices.addAutor(AutorRequest);
    //   this.dialog.closeAll();

    // }
  }

  obtenerImagen(event): any {
    console.log(event.target.files[0].name);
    this.imgFoto = "assets/img/" + event.target.files[0].name;
  }

  obtenerLogo(event): any {
    console.log(event.target.files[0].name);
    this.imgLogo = "assets/img/" + event.target.files[0].name;
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





