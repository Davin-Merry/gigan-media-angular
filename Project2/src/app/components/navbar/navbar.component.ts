import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currUser = null;

  constructor() { }

  ngOnInit() {
    this.performCheck();
  }

  performCheck() {
    this.currUser = JSON.parse(sessionStorage.getItem('user'));
    console.log("NavbarComponent: Check performed.")
    console.log("currUser: " + this.currUser);
  }

  performLogout() {
    sessionStorage.clear();
  }
}
