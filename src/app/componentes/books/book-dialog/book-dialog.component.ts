import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subscription } from 'rxjs';
import { Autor } from 'src/app/interfaces/autor.model';
import { AutoresService } from 'src/app/services/autores.service';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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


// INFORMACION SOBRE EL MATCHIPS
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Aventura'];
  allFruits: string[] = ['Aventura', 'Shounen', 'Suspenso', 'Misterio', 'Acción', 'Fantasía', 'Gore', 'Sobrenatural', 'Romance', 'Drama', 'Artes Marciales', 'Ciencia Ficción', 'Thriller', 'Comedia', 'Mecha', 'Supernatural', 'Tragedia',  'Adulto', 'Harem', 'Yuri', 'Seinen', 'Horror', 'Webtoon', 'Apocalíptico', 'Boys Love', 'Ciberpunk', 'Crimen', 'Demonios', 'Deporte', 'Ecchi', 'Extranjero', 'Familia', 'Fantasia', 'Género Bender', 'Girls Love', 'Guerra', 'Historia', 'Magia', 'Militar', 'Musica', 'Parodia', 'Policiaco', 'Psicológico', 'Realidad', 'Realidad Virtual', 'Recuentos de la vida', 'Reencarnación', 'Samurái', 'Superpoderes', 'Supervivencia', 'Vampiros'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  constructor(
    private bookServices: BooksService,
    private dialog: MatDialog,
    private autorService: AutoresService
  ) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  guardarLibro(form: NgForm): void {
    // console.log(form.value);
    if (form.valid) {
      Swal.fire({
        title: '¿Quieres guardar el libro?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
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
            fechaPublicacion: new Date(this.fechaPublicacion),
            imgFoto: this.imgFoto
          };
          this.bookServices.addBook(libroRequest);
          this.autorSuscripcion = this.bookServices.addBookListener().subscribe(() => {
            this.dialog.closeAll();
            Swal.close();
          });
          Swal.fire('Guardado!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Libro no guardado', '', 'info')
        }
      });

    }
  }

  obtenerImagen(event): any {
    this.imgFoto = 'assets/img/' + event.target.files[0].name;
  }

  selected2(event: MatSelectChange): void {
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
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    // event.chipInput!.clear();
      // fruta.value="";

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
