import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post:Post;

  constructor() { }

  ngOnInit() {
    let user = new User("First", "Last", "mail@email.com", "", "");
    this.post = new Post(0, user, "", [], 0, []);
  }

}
