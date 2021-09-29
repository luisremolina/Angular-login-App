import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Books } from 'src/app/interfaces/books.model';
import { BooksService } from 'src/app/services/books.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-tarjeta-books',
  templateUrl: './tarjeta-books.component.html',
  styleUrls: ['./tarjeta-books.component.css']
})
export class TarjetaBooksComponent implements OnInit, OnDestroy {

  private booksSuscription: Subscription;
  booksLista: Books[] = [];

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.booksService.getBooksWithoutPagination();
    this.booksSuscription = this.booksService.addBookListener().subscribe( (data: Books[]) =>{
      this.booksLista = data;
      Swal.close();
    });

  }
  ngOnDestroy(): void{
    this.booksSuscription.unsubscribe();
  }

}
