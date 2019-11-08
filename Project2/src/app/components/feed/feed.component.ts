import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.http.get(environment.mainUrl + "post/getAll.app").toPromise().then(r => {
      this.posts = r;
      this.posts.sort(function(a, b) {
        return(b['time'] - a['time']);
      });
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

  likePost(index: number) {
    this.http.post(environment.mainUrl + "post/likePost.app", this.posts[index])
    .toPromise().then(r => {
      this.posts[index].likes++;
      console.log('Post successfully liked');
    })
  }
  
  /* 
  likePost(index: number) {
    let canAdd: boolean = true;
    let u = JSON.parse(sessionStorage.getItem('user'));
    this.posts[index].likes.forEach(e => {
      if(e.email === u.email) {
        canAdd = false;
      }
    });

    if (canAdd) {
      this.posts[index].likes.push(u);
      this.http.post(environment.mainUrl + "post/likePost.app", this.posts[index])
      .toPromise().then(r => {
        console.log('Post successfully liked');
      })
    }
  }
  */

  gotoSelectedProfile(index: number) {
    console.log(this.posts[index].blogger);
    sessionStorage.setItem('selectedUser', JSON.stringify(this.posts[index].blogger));
    this.router.navigate(['/profile']);
  }

  postText():string {
    return this.posts[0].postText;
  }

}
