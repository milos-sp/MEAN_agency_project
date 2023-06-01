import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Image } from '../model/image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService) { }

  user: User = new User();
  image: Image = new Image();

  ngOnInit(): void {
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
      this.user = data
    })
    this.imageService.getImageByUsername(sessionStorage.getItem('username')).subscribe((data: Image)=>{
      this.image = data
    })
  }

}
