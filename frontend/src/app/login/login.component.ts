import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  message: string = "";

  ngOnInit(): void {
  }

  login(){
    if(!this.username || !this.password){
      this.message = "Morate uneti sve podatke";
      return;
    }
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user != null){
        //sessionStorage
        if(user.type == 'klijent'){
          this.router.navigate(['client'])
        }else if(user.type == 'agencija'){
          this.router.navigate(['agency'])
        }
      }else{
        this.message = "Nepostojeće korisničko ime ili pogrešna lozinka"
      }
    })
  }

}
