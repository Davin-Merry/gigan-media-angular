import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: any;
  doneLoading = false;
  profilePosts = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(environment.mainUrl + "post/getAll.app").toPromise().then(r => {
      console.log(r);
      this.posts = r;
      this.doneLoading = true;
    });
  }

  gotoSelectedProfile(index: number) {
    console.log(index);
  }

  postText():string {
    return this.posts[0].postText;
  }

}
