import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  owner:User;
  profile:Profile;

  constructor() { }

  ngOnInit() {
    this.owner = new User("First", "Last", "mail@email.com", "", "");
    this.profile = new Profile("https://gigan-media-bucket.s3.us-east-2.amazonaws.com/profile_images/profile_default_x256.png",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis augue nec egestas consequat. Sed vel quam lacus. Aliquam quis blandit tellus. Pellentesque consectetur efficitur finibus. Nulla facilisi. Mauris nec viverra risus. Ut eu diam libero. Cras efficitur vel tellus sed iaculis. Sed ut turpis nec nunc aliquet fermentum. Duis vulputate orci urna, ut ultricies odio tincidunt malesuada.",
    "Galaxy", "Solar System", "Planet", this.owner._email);
  }

}
