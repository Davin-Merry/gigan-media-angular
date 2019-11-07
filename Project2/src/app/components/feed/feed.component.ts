import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  posts:Post[];
  doneLoading = false;

  constructor(http: HttpClient) { }

  ngOnInit() {
    this.doneLoading = true;
  }

  postText():string {
    return this.posts[0].postText;
  }

}
