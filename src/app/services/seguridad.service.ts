import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.model';
import { Login } from '../interfaces/login-data.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';
@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;
  private userLogeado$ = new Subject<boolean>();

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
        this.userLogeado$.next(true)
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
        this.userLogeado$.next(true)
        localStorage.setItem('token', response.token)
        this.route.navigate(['home']);
      });
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
        this.userLogeado$.next(true);
        localStorage.setItem('token', response.token);
        this.route.navigate(['home']);

      }, err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ocurrio mal verifica tus credenciales!',
        });
      });
  }

  cerrarSesion() {
    this.usuario = null;
    localStorage.removeItem('token');
    this.seguridadCambio.next(false);
    this.userLogeado$.next(false);
    this.route.navigate(['login']);

  }

  obtenerUsuario() {
    return { ...this.usuario };
  }

  estaAutenticado() {
      return this.token != null;
  }

  getEstado(){
    // console.log("entro al get");
    return this.seguridadCambio.asObservable();
  }
}
