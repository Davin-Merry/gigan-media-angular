import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  image: File = null;
  fileToUpload: string = '';
  fileURL: string = '';

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }

  fileSelect(event: any) {
    this.image = event.target.files[0];
    this.fileToUpload = '(' + this.image.name + ')';
    this.uploadImage(this.image);
  }

  uploadImage(file: File) {
    if (this.image != null) {

      let fr = new FileReader();
      fr.readAsArrayBuffer(file);
      fr.onloadend = (e) => {
        console.log(fr.result);
      }

      let fileName = file.name.split(".");
      let fileType = fileName[fileName.length - 1];
      
      this.http.post(environment.mainUrl + 'post/uploadPostImage.app?id='
        + fileName + '&type=' + fileType, file)
      .toPromise().then(r => {
        let d: any = JSON.parse(JSON.stringify(r));
        this.fileURL = d.newURL;
      });
    }
  }

  submitPost(form:NgForm) {
    //TODO: Perform a POST on images BEFORE publishing a new post from user. 
    console.log(form.value.postContent);

    let data = {
      postId: 0,
      blogger: JSON.parse(sessionStorage.getItem('user')),
      text: form.value.postContent,
      images: this.fileURL,
      time: Date.now(),
      likes: 0
    }
    console.log(data);

    this.http.post(environment.mainUrl + "post/putIn.app", data
    ).toPromise().then(r => {
      console.log("Data reflected:")
      console.log(r);
      location.reload();
    });
  }
}
