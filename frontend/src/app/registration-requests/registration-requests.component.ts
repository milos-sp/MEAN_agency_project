import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {

  constructor(private userService: UserService) { }

  requests: User[] = [];

  ngOnInit(): void {
    this.userService.getPendingUsers().subscribe((data: User[])=>{
      this.requests = data
    })
  }

  accept(r: User){
    this.userService.acceptRequest(r).subscribe((resp)=>{
      console.log(resp['message'])
      this.userService.getPendingUsers().subscribe((data: User[])=>{
        this.requests = data
      })
    })
  }

  reject(r: User){
    this.userService.rejectRequest(r).subscribe((resp=>{
      console.log(resp['message'])
      this.userService.getPendingUsers().subscribe((data: User[])=>{
        this.requests = data
      })
    }))
  }

}
