import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Image } from '../model/image';
import { ImageService } from '../image.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private activatedRouter: ActivatedRoute) { }

  user: User = new User();
  image: Image = new Image();
  admin: boolean;

  ngOnInit(): void {
    if(this.activatedRouter.snapshot.paramMap.get('username')==null){
      this.admin = false
      this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
        this.user = data
      })
      this.imageService.getImageByUsername(sessionStorage.getItem('username')).subscribe((data: Image)=>{
        this.image = data
      })
    }else{
      this.admin = true
      this.userService.getUserByUsername(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: User)=>{
        this.user = data
      })
      this.imageService.getImageByUsername(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: Image)=>{
        this.image = data
      })
    }
  }

  editUser(isClient: boolean){
    if(isClient){
      this.userService.editClient(this.user).subscribe((resp=>{
        window.location.reload()
      }))
    }else{
      this.userService.editAgency(this.user).subscribe((resp=>{
        window.location.reload()
      }))
    }
  }

  editImage(){
    
  }

}
