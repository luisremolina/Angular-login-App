
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SeguridadService } from '../services/seguridad.service';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {

  constructor(private seguridadServices: SeguridadService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenSeguridad = this.seguridadServices.getToken();
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenSeguridad)
    });
    return next.handle(request);
  }
}
