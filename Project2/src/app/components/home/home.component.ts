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
  image: any = null;

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
  }

  submitPost(form:NgForm) {
    //TODO: Perform a POST on images BEFORE publishing a new post from user. 
    console.log(form.value.postContent);
    console.log(Date.now());

    this.http.post(environment.mainUrl + "post/putIn.app", {
      postId: 0,
      blogger: sessionStorage.getItem('user'),
      text: form.value,
      images: [],
      time: Date.now(),
      likes: []
    }).toPromise().then(r => {
      console.log("Data reflected:")
      console.log(r);
    });
  }
}
