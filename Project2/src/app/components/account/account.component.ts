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
  //Declare variables here
  owner: any;
  saved = false;
  submitClass = 'btn btn-secondary disabled';
  selectedFile: File;
  currentImage = null;
  fileToUpload = 'Upload a new profile pic...'

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.owner = JSON.parse(sessionStorage.getItem('user'));
    this.currentImage = this.owner.profileImage;
  }

  performUpdate(form:NgForm) {
    //I absolutely despise this, but it was the only thing I could think of...
    if (form.value.firstName === '') {
      form.value.firstName = this.owner.firstName;
    }
    if (form.value.lastName === '') {
      form.value.lastName = this.owner.lastName;
    }
    if (form.value.galaxy === '') {
      form.value.galaxy = this.owner.galaxy;
    }
    if (form.value.planet === '') {
      form.value.planet = this.owner.planet;
    }

    this.http.post(environment.mainUrl + 'user/updateInfo.app', {
      email: this.owner.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      galaxy: form.value.galaxy,
      planet: form.value.planet,
      bio: form.value.bio
    }).toPromise().then(r => {
      this.owner.firstName = form.value.firstName;
      this.owner.lastName = form.value.lastName;
      this.owner.galaxy = form.value.galaxy;
      this.owner.planet = form.value.planet;
      this.owner.bio = form.value.bio;
      sessionStorage.setItem('user', JSON.stringify(this.owner));
      new NavbarComponent().performCheck();
      console.log(r);
      location.reload();
    });
  }

  fileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileToUpload = this.selectedFile.name;
    this.currentImage = this.fileToUpload;
    this.submitClass = "btn btn-primary";
  }

  submit() {
    this.uploadImage(this.selectedFile);
  }
  
  uploadImage(file: File) {
    if (this.selectedFile != null) {
      console.log(this.owner);
      console.log(sessionStorage.getItem('user'));
      console.log(file);
      console.log(file.name);

      let fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.onloadend = (e) => {
        console.log(fr.result);
      }

      let fileName = file.name.split(".");
      let fileType = fileName[fileName.length - 1];
      
      //TODO: Fix live update
      this.http.post(environment.mainUrl + 'user/updateProfilePic.app?id='
        + this.owner.email + '&type=' + fileType, file,
      {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        console.log(event);
        if (event.type == 4) {
          location.reload();
        }
      });
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