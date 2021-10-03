import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../interfaces/autor.model';
import { PaginationAutors } from '../interfaces/paginationAutors.model';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();
  autorPagination: PaginationAutors;
  autorPaginationSubject = new Subject<PaginationAutors>();

  constructor(private http: HttpClient) { }

  getAutores(){
    this.http.get<Autor[]>(this.baseUrl + 'api/libreriaAutor').subscribe( (data) =>{
      this.autoresLista = data;
      this.autoresSubject.next([...this.autoresLista]);
    });
  }

  getActualListener(){
    return this.autoresSubject.asObservable();
  }
  getActualListenerPagination(){
    return this.autorPaginationSubject.asObservable();
  }

  addAutor(usr: Autor): void {

    this.http.post(this.baseUrl + 'api/libreriaAutor', usr)
    .subscribe((response)=>{

      this.autoresSubject.next();

    });

  }


  getAutorPagination(librosPorPagina: number, paginaActual: number, sort: string, sortDirection: string, filterValue: any) {

    const request = {
      pageSize: librosPorPagina,
      page: paginaActual,
      sort,
      sortDirection,
      filterValue
    };
    // console.log(request);
    this.http.post<PaginationAutors>(this.baseUrl + 'api/libreriaAutor/pagination', request)
      .subscribe((response) => {
        this.autorPagination = response;
        this.autorPaginationSubject.next(this.autorPagination);
      });
  }
}
