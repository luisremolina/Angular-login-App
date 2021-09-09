import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:sign";
  private apiKey = "AIzaSyB_lem_66Sqg3GhPWeNkSuJaXbEqvg2zIQ";
  userToken:string;

  // CREAR NUEVO USUARIO
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // LOGIN
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http:HttpClient) { 
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  login( usuario: UsuarioModel){
    const authData = {
      ...usuario, // de esta manera se envia todos los campos que tiene usuaio, nombre, email, password
      returnSecureToken: true
    };
    return this.http.post(`${this.url}InWithPassword?key=${this.apiKey}`, authData).pipe(map( res =>{
      console.log('entro en el map del rjsx')
      this.guardarToken(res['idToken']);
      return res;
    })); 
  }

  nuevoUsuario( usuario: UsuarioModel){
    const authData = {
      // email : usuario.email,
      // password: usuario.password,
      ...usuario, // de esta manera se envia todos los campos que tiene usuaio, nombre, email, password
      returnSecureToken: true
    };
    return this.http.post(`${this.url}Up?key=${this.apiKey}`, authData).pipe(map( res =>{
      console.log('entro en el map del rjsx')
      this.guardarToken(res['idToken']);
      return res;
    }));
  }

  private guardarToken( idToken:string ){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean{
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    }else{
      return false;
    }


  }

}
