import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  owner: any;
  saved = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.owner = JSON.parse(sessionStorage.getItem('user'));
  }

  performUpdate(form:NgForm) {
    //TODO: Perform a live change to user information.
    this.http.post(environment.mainUrl + "user/updateInfo.app", {
      email: this.owner.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      galaxy: form.value.galaxy,
      planet: form.value.planet,
      //TODO: Replace with custom image
      profileImage: 'https://gigan-media-bucket.s3.us-east-2.amazonaws.com/profile_images/profile_default_x256.png'
    }).toPromise().then(r => {
      this.owner.firstName = form.value.firstName;
      this.owner.lastName = form.value.lastName;
      this.owner.galaxy = form.value.galaxy;
      this.owner.planet = form.value.planet;
      sessionStorage.setItem('user', JSON.stringify(this.owner));
      new NavbarComponent().performCheck();
      console.log(r);
      location.reload();
    });
  }
}
// TODO: 

/*
$(document).ready(function() {

    
  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.avatar').attr('src', FileReader.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  

  $(".file-upload").on('change', function(){
      readURL(this);
  });
});

*/