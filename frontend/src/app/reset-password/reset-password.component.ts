import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email: string = null
  message: string = null
  mails: Set<string> = new Set<string>()
  sent: boolean = false

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[])=>{
      data.forEach(el => {
        this.mails.add(el.email)
      });
    })
  }

  reset(){
    if(!this.email || !this.mails.has(this.email)){
      this.message = "Ne postoji korisnik sa unesenom email adresom"
      return;
    }
    this.sent = true
    this.userService.reset(this.email).subscribe((res=>{
      console.log(res)
    }))
  }

}
