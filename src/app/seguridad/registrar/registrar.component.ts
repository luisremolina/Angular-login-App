import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private seguridadServices: SeguridadService) { }

  ngOnInit(): void {
  }

  registrar(form: NgForm){
    if (form.valid) {
      console.log(form.value);
      this.seguridadServices.registrarUsuario({
        nombre: form.value.nombre,
        apellido: form.value.apellido,
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        usuarioId: '',
        token: ''
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa el formulario!',
      });
    }
  }

}
