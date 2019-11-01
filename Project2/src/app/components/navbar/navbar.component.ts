import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private pro = null;
  currUser = null;

  constructor() { }

  ngOnInit() {
    this.pro = new Profile("", "", "", "", "", "");
    this.currUser = new User("First", "Last", "myemail@mail.com", "", "", this.pro);
  }
}
