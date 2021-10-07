import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userLogeado = true;
  // userSubject = Subject;
  constructor(private userServices: SeguridadService) { }

  ngOnInit(): void {
    this.userLogeado = this.userServices.estaAutenticado();
  }

}
