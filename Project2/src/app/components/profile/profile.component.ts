import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  owner: any;

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.owner = JSON.parse(sessionStorage.getItem('selectedUser'));
  }
}
