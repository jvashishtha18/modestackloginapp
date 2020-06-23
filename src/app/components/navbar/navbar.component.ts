import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private authService:AuthServiceService, private router:Router) { }
  onLogoutClick(){
    this.authService.logout();
    alert("logout works")
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  get isLoggedIn() { return this.authService.isLoggedIn(); }
};
