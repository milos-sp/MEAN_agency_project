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
  //za promenu lozinke
  loggedUser: User = new User();
  oldPassword: string = null;
  newPassword1: string = null;
  newPassword2: string = null;
  message: string = null;

  ngOnInit(): void {
    this.userType = 1;
    this.userService.getAllClients().subscribe((data: User[])=>{
      this.clients = data
    })
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.agencies = data
    })
    this.userService.getUserByUsername(sessionStorage.getItem('admin_username')).subscribe((data: User)=>{
      this.loggedUser = data
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
      sessionStorage.clear()
      this.router.navigate(['admin/login'])
    }))
  }

}
