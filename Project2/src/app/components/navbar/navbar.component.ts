import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { ProfileComponent } from '../profile/profile.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currUser = null;

  constructor() {

  }

  ngOnInit() {
    this.currUser = JSON.parse(sessionStorage.getItem('user'));
  }

  showOwnProfile() {
    sessionStorage.setItem('selectedUser', sessionStorage.getItem('user'))
  }

  performLogout() {
    sessionStorage.clear();
  }
}
