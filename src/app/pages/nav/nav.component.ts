import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // login;
  constructor(private auth:AuthService, private route: Router) { 
  }
  ngOnInit() {
  }

  getOut(){
    this.auth.logout();
    this.route.navigateByUrl('/welcome');
    window.location.reload();
    
  }

}
