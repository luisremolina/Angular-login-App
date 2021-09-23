import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { Books } from '../interfaces/books.model';
import { PaginationBooks } from '../interfaces/paginationBooks.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksLista: Books[] = [];

  bookSubject = new Subject();


  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();



  constructor(private http: HttpClient) { }

  getBooks(librosPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {

    const request = {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    console.log(request);
    this.http.post<PaginationBooks>( this.baseUrl + 'api/libros/pagination', request)
      .subscribe( (response) => {
        this.bookPagination = response;
        this.bookPaginationSubject.next(this.bookPagination);
      });
  }

  getActualListener() {
    return this.bookPaginationSubject.asObservable();
  }

  addBook(book: Books) {

    this.http.post(this.baseUrl + 'api/libros', book)
      .subscribe((response)=>{

        this.bookSubject.next();

      });

  }
  addBookListener(){
    return this.bookSubject.asObservable();
  }
}
