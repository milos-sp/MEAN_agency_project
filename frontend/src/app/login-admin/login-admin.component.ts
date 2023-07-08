import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  message: string = null;

  ngOnInit(): void {
  }

  login(){
    if(!this.username || !this.password){
      this.message = "Morate uneti sve podatke";
      return;
    }
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if(user != null){
        if(user.type == 'admin'){
          sessionStorage.setItem("logged", user.type)
          this.router.navigate(['admin'])
        }else{
          this.message = "Nepostojeće korisničko ime ili pogrešna lozinka"
        }
      }else{
        this.message = "Nepostojeće korisničko ime ili pogrešna lozinka"
      }
    })
  }

}
