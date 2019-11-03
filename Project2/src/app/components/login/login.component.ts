import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registration = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  performLogin(email, pass) {
    sessionStorage.setItem('user', new User('John', 'Doe', email, pass, '', null).toString());
  }

  toggleRegister() {
    this.registration = !this.registration;
  }

}
