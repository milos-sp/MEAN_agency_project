import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  address: Address;
  country: string;
  name: string;
  loggedUser: User = new User();
  oldPassword: string = null;
  newPassword1: string = null;
  newPassword2: string = null;
  message: string = null;

  ngOnInit(): void {
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
      this.loggedUser = data
    })
  }

  changePassword(){
    this.message = null
    let regPassword = new RegExp(/^(?=[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[A-Z]).{7,12}$/)
    if(!this.oldPassword || !this.newPassword1 || !this.newPassword2){
      this.message = 'Popunite sva polja';
      return;
    }
    this.userService.comparePasswords(this.loggedUser.username, this.oldPassword).subscribe(resp=>{
      if(!resp){
        this.message = 'Stara loznika nije ispravna';
        return;
      }
    })
    if(!regPassword.test(this.newPassword1)){
      this.message = 'Nova lozinka nije u ispravnom formatu';
      return;
    }
    if(this.newPassword1 != this.newPassword2){
      this.message = 'Loznike se ne poklapaju';
      return;
    }
    this.userService.changePassword(this.loggedUser.username, this.newPassword1).subscribe((resp=>{
      this.router.navigate(['logout'])
    }))
  }

}
