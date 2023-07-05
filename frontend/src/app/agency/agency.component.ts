import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private userService: UserService) { }

  address: Address;
  country: string;
  name: string;
  loggedUser: User = new User();
  oldPassword: string = null;
  newPassword1: string = null;
  newPassword2: string = null;

  ngOnInit(): void {
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
      this.loggedUser = data
    })
  }

  changePassword(){
    
  }

}
