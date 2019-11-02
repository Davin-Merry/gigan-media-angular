import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  post:Post;

  constructor() { }

  ngOnInit() {
  }

  postText():string {
    return this.post.postText;
  }

}
