import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  username: string;
  loggedUser: User = new User();
  oldPassword: string = null;
  newPassword1: string = null;
  newPassword2: string = null;
  message: string = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    this.userService.getUserByUsername(this.username).subscribe((data: User)=>{
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
    if(this.oldPassword != this.loggedUser.password){
      this.message = 'Stara loznika nije ispravna';
      return;
    }
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
