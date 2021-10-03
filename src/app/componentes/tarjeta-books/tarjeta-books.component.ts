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
  visible = "";

  constructor(private booksService: BooksService) { this.mostrarCard(); }


  // mostrar() {
  //   $(function () {
  //     var card = $(this).parent('.material-card');
  //     var icon = $(this).children('i');
  //     icon.addClass('fa-spin-fast');
  //   });
  // }

  mostrarCard() {
    $(function () {
      $('.material-card > .mc-btn-action').click(function () {
        var card = $(this).parent('.material-card');
        var icon = $(this).children('i');
        icon.addClass('fa-spin-fast');

        if (card.hasClass('mc-active')) {
          card.removeClass('mc-active');

          window.setTimeout(function () {
            icon
              .removeClass('fa-arrow-left')
              .removeClass('fa-spin-fast')
              .addClass('fa-bars');

          }, 800);
        } else {
          card.addClass('mc-active');
          window.setTimeout(function () {
            icon
              .removeClass('fa-bars')
              .removeClass('fa-spin-fast')
              .addClass('fa-arrow-left');

          }, 800);
        }
      });
    });
  }

  salir() {
    this.visible = "";
  }

  ngOnInit(): void {

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.booksService.getBooksWithoutPagination();
    this.booksSuscription = this.booksService.addBookListener().subscribe((data: Books[]) => {
      this.booksLista = data;
      Swal.close();
    });

  }
  ngOnDestroy(): void {
    this.booksSuscription.unsubscribe();
  }

}
