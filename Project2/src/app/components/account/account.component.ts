import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  owner: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.owner = JSON.parse(sessionStorage.getItem('user'));
  }

  performUpdate(form:NgForm) {
    //TODO: Perform "login" to change user information.
    if (form.value.newPass === form.value.cPass) {
      this.http.post(environment.mainUrl + "user/putIn.app", {
        email: this.owner.email,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        galaxy: form.value.galaxy,
        planet: form.value.planet,
        profileImage: 'https://gigan-media-bucket.s3.us-east-2.amazonaws.com/profile_images/profile_default_x256.png'
      }).toPromise().then(r => console.log(r));
    }
  }
}
// TODO: 

/*
$(document).ready(function() {

    
  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.avatar').attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  

  $(".file-upload").on('change', function(){
      readURL(this);
  });
});

*/