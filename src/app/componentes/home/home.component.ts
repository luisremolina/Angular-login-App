import { Component, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  userLogeado;
  private userSuscription = new Subscription;
  // @ViewChild('sessionDuration') durationElement:ElementRef;

  constructor(private userServices: SeguridadService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.isAutenticado();
    // this.ngZone.run( () => {
      // this.userSuscription = this.userServices.getEstado().subscribe((res: boolean) => {
        // this.userLogeado = res;
      // });
    // })
  }

  isAutenticado(){
    this.userLogeado = this.userServices.estaAutenticado();
    // return this.userServices.estaAutenticado();
  }

  ngOnDestroy(): void {
    this.userSuscription.unsubscribe();
  }



}
