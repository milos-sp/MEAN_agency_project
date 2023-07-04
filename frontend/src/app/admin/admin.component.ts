import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) { }

  userType: number;
  clients: User[] = [];
  agencies: User[] = [];

  ngOnInit(): void {
    this.userType = 1;
    this.userService.getAllClients().subscribe((data: User[])=>{
      this.clients = data
    })
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.agencies = data
    })
  }

  changeType(n){
    this.userType = n;
  }

  showProfile(u: User){
    this.router.navigate(['profiles/'+u.username])
  }

  deleteUser(u: User){
    this.userService.deleteUser(u.username).subscribe((resp=>{
      this.imageService.deleteImage(u.username)
      console.log(resp['message'])
      if(u.type=='klijent'){
        this.userService.getAllClients().subscribe((data: User[])=>{
          this.clients = data
        })
      }else{
        this.userService.getAllAgencies().subscribe((data: User[])=>{
          this.agencies = data
        })
      }
    }))
  }

}
