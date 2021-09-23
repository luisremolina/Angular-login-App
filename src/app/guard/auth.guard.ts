import { CanActivate, Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { SeguridadService } from "../services/seguridad.service";

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private seguridadService: SeguridadService, private route: Router){}

  canActivate():boolean {
    if (this.seguridadService.estaAutenticado()) {
      return true;
    }else{
      this.route.navigate(['/login']);
      return false;
    }
  }

}
