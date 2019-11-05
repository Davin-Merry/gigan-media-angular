import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project2';
  currUser = sessionStorage.getItem('user');

  public setCurrUser() {
    this.currUser = sessionStorage.getItem('user');
  }
}
