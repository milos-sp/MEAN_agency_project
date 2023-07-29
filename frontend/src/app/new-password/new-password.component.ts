import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  password1: string = null
  password2: string = null
  message: string = null

  constructor(private userService: UserService, private activeRouter: ActivatedRoute) { }

  ngOnInit(): void {
  }

  change(){
    let regPassword = new RegExp(/^(?=[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[A-Z]).{7,12}$/)
    if(!this.password1 || !this.password2){
      this.message = "Unesite oba polja"
      return;
    }
    if(!regPassword.test(this.password1) || !regPassword.test(this.password2)){
      this.message = "Lozinke nisu u ispravnom formatu"
      return;
    }
    if(this.password1 != this.password2){
      this.message = "Lozinke se ne poklapaju"
      return;
    }
    this.userService.changePasswordEmail(this.activeRouter.snapshot.paramMap.get('email'), this.password1).subscribe((res)=>{
      console.log(res['message'])
    })
  }

}
