import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts: any;
  doneLoading = false;
  profilePosts = null;

  constructor(private http: HttpClient, private router: Router) { console.log('reached') }

  ngOnInit() {
    this.http.get(environment.mainUrl + "post/getAll.app").toPromise().then(r => {
      console.log(r);
      this.posts = r;
      this.doneLoading = true;
      if (this.router.url != '/home') {
        let selectedPosts = this.posts;
        this.posts = [];
        let u = JSON.parse(sessionStorage.getItem('selectedUser'));
          selectedPosts.forEach(e => {
            if (e.blogger.email === u.email) {
              this.posts.push(e);
            }
          });
      }
    });
  }

  gotoSelectedProfile(index: number) {
    console.log(this.posts[index].blogger);
    sessionStorage.setItem('selectedUser', JSON.stringify(this.posts[index].blogger));
    this.router.navigate(['/profile']);
  }

  postText():string {
    return this.posts[0].postText;
  }

}
