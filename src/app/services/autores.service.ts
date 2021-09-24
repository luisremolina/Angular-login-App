import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Autor } from '../interfaces/autor.model';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  baseUrl = environment.baseUrl;
  private autoresLista: Autor[] = [];
  private autoresSubject = new Subject<Autor[]>();


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

  addAutor(usr: Autor): void {

    this.http.post(this.baseUrl + 'api/libreriaAutor', usr)
    .subscribe((response)=>{

      this.autoresSubject.next();

    });

  }
}
