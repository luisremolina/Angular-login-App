import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.model';
import { Login } from '../interfaces/login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  getToken(): string {
    return this.token;
  }

  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }
    this.token = tokenBrowser;
    this.seguridadCambio.next(true);
    this.http.get<Usuario>(this.baseUrl + 'usuario')
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token)
      });

  }

  obtenerToken(): string {
    return this.token;
  }

  constructor(private route: Router, private http: HttpClient) { }

  registrarUsuario(usr: Usuario): void {

    this.http.post<Usuario>(this.baseUrl + 'usuario/registrar', usr)
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token)
        this.route.navigate(['home']);
      });
    // this.usuario = {
    //   email: usr.email,
    //   usuarioId: Math.round(Math.random() * 10000).toString(),
    //   nombre: usr.nombre,
    //   apellidos: usr.apellidos,
    //   username: usr.username,
    //   password: usr.password,
    //   token: usr.token
    // }
    // this.seguridadCambio.next(true);

    // this.route.navigate(['home']);
  }

  login(loginData: Login): void {

    this.http.post<Usuario>(this.baseUrl + 'usuario/login', loginData)
      .subscribe((response) => {
        this.token = response.token;

        this.usuario = {
          email: response.email,
          nombre: response.nombre,
          apellido: response.apellido,
          token: response.token,
          password: '',
          username: response.username,
          usuarioId: response.usuarioId
        };
        this.seguridadCambio.next(true);
        localStorage.setItem('token', response.token)
        this.route.navigate(['home']);
      });

  }

  cerrarSesion() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('token');
    this.route.navigate(['login']);

  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  estaAutenticado() {
    return this.token != null;
  }



}
