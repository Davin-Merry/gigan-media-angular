import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NavbarComponent } from '../navbar/navbar.component';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registration = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }
  
  failedLogin = false;
  performLogin(form:NgForm) {
    this.http.post(environment.mainUrl + "user/processLogin.app", {
      email: form.value.email,
      password: form.value.pass
    }).toPromise().then(r => {
      if (r != null) {
        sessionStorage.setItem('user', JSON.stringify(r));
        //this.router.navigateByUrl('/', {skipLocationChange: true});
        this.router.navigate(['/home']);
      } else {
        this.failedLogin = true;
      }
    });
  }
  
  performRegister(form:NgForm) {
    if (form.value.pass === form.value.cPass) {
      this.http.post(environment.mainUrl + "user/putIn.app", {
        email: form.value.email,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        password: form.value.pass,
        profileImage: 'https://gigan-media-bucket.s3.us-east-2.amazonaws.com/profile_images/profile_default_x256.png'
      }).toPromise().then(r => console.log(r));
    }
  }

  toggleRegister() {
    this.registration = !this.registration;
  }

}
