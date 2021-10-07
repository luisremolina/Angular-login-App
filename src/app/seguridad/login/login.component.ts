import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../../services/seguridad.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private loginUser: SeguridadService) { }

  ngOnInit(): void {
  }

  loginUsuario(form: NgForm){
    if (form.valid) {
      this.loginUser.login({
        email: form.value.email,
        password: form.value.password
      });
    }
  }

}
