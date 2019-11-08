import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userSource = new BehaviorSubject('empty');
  selectedUser = this.userSource.asObservable();

  constructor() { }

  setSelectedUser(u: any) {
    this.selectedUser = u;
    console.log('new user selected');
    console.log(this.selectedUser);
  }

}
