import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Books } from 'src/app/interfaces/books.model';
import { BooksService } from 'src/app/services/books.service';

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
    this.booksService.getBooksWithoutPagination();
    this.booksSuscription = this.booksService.addBookListener().subscribe( (data: Books[]) =>{
      this.booksLista = data;
    });

  }
  ngOnDestroy(): void{
    this.booksSuscription.unsubscribe();
  }

}
