import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate:[ AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  // { path: 'principal'   , component: PrincipalComponent },
  { path: 'welcome'   , component: BienvenidoComponent },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
