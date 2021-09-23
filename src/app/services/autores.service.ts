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

  // private autoresLista: Autor[] = [
  //   {autorId: 1, nombre: 'Eichiro', apellidos: 'Oda', gradoAcademico: 'Universitario'},
  //   {autorId: 2, nombre: 'Kisimono', apellidos: 'kaku', gradoAcademico: 'Novelista'},
  //   {autorId: 3, nombre: 'Luis', apellidos: 'Remolina', gradoAcademico: 'Ingeniero de sistemas'},
  //   {autorId: 3, nombre: 'Juan Jose', apellidos: 'Jaimes', gradoAcademico: 'Ingeniero de sistemas'}
  // ];

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

}
