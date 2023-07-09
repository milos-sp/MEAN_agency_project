import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Address } from '../model/address';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string;
  password: string;
  password2: string;
  email: string;
  telephone: string;
  type: string = "";
  message: string = null;
  admin: boolean;
  //picture: Image;
  //za klijenta
  firstname: string = null;
  lastname: string = null;
  //za agenciju
  agency: string = null;
  address: Address = new Address();
  address_string: string;
  agencyID: number = null;
  description: string = null;
  //za upload slike
  selectedImage: boolean = false;
  image: File;
  isWrongSize: boolean;
  messageImage: string = null;

  //jedinstveni podaci
  emails: Set<string> = new Set<string>();
  usernames: Set<string> = new Set<string>();
  agencyIDs: Set<number> = new Set<number>();

  ngOnInit(): void {
    this.admin = sessionStorage.getItem("logged") == "admin"
    this.userService.getUsers().subscribe((data: User[])=>{
      data.forEach(user => {
        this.emails.add(user.email)
        this.usernames.add(user.username)
        if(user.agencyID) this.agencyIDs.add(user.agencyID)
      });
    })
    this.userService.getPendingUsers().subscribe((data: User[])=>{
      data.forEach(pending => {
        this.emails.add(pending.email)
        this.usernames.add(pending.username)
        if(pending.agencyID) this.agencyIDs.add(pending.agencyID)
      });
    })
  }

  register(){
    let regPassword = new RegExp(/^(?=[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[A-Z]).{7,12}$/)
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!this.username || !this.password || !this.email || !this.telephone){
      this.message = "Sva polja su obavezna";
      return;
    }
    if(!this.type){
      this.message = "Morate odabrati tip";
      return;
    }else{
      if(this.usernames.has(this.username)){
        this.message = "Korisničko ime mora biti jedinstveno"
        return;
      }
      if(this.emails.has(this.email)){
        this.message = "Email adresa mora biti jedinstvena"
        return;
      }
      if(!regPassword.test(this.password)){
        this.message = "Lozinka nije u ispravnom formatu";
        return;
      }
      if(!regEmail.test(this.email)){
        this.message = "Email adresa nije u ispravnom formatu";
        return;
      }
      this.message = "";
      if(this.type=='klijent'){
        if(!this.firstname || !this.lastname){
          this.message = "Unesite ime i prezime";
          return;
        }
      }else{
        if(!this.address){
          this.message = "Popunite sva polja vezana za adresu";
          return;
        }
        if(this.agencyIDs.has(this.agencyID)){
          this.message = "ID agencije mora biti jedinstven";
          return;
        }
      }
    }
    if(this.password != this.password2){
      this.message = "Lozinke se ne poklapaju";
      return;
    }
    if(!this.isWrongSize){
      this.message = "Postavite sliku ispravnih dimenzija";
      return;
    }
    this.address_string = this.address.country + ' ' + this.address.city + ' ' + this.address.street + ' ' + this.address.street_n;
    if(this.admin){
      this.userService.addUser(this.username, this.password, this.email, this.telephone, this.type, this.firstname, this.lastname,
        this.agency, this.address, this.agencyID, this.description, this.address_string).subscribe(resp=>{
          if(!this.selectedImage){
            this.userService.addDefaultImage(this.username, 'http://127.0.0.1:4000/uploads/avatar_default.png')
          }else{
            this.submitImage()
          }
          this.router.navigate(['admin'])
        })
    }else{
      this.userService.register(this.username, this.password, this.email, this.telephone, this.type, this.firstname, this.lastname,
        this.agency, this.address, this.agencyID, this.description, this.address_string).subscribe(resp=>{
          if(!this.selectedImage || this.isWrongSize){
            this.userService.addDefaultImage(this.username, 'http://127.0.0.1:4000/uploads/avatar_default.png')
          }else{
            this.submitImage()
          }
          this.router.navigate([''])
        })
    }
  }

  imageSelected(event){
    const URL = window.webkitURL;
      let img = new Image();
      img.src = URL.createObjectURL(event.target.files[0]);
      this.messageImage = null;
      img.onload = (evt) => {
        let height = img.height
        let width = img.width
        //console.log(height,width)
        if(height<100 || width<100){
          this.isWrongSize = true
          this.selectedImage = false
          this.messageImage = "Slika je manja od 100x100px";
          return;
        }
        if(height>300 || width>300){
          this.isWrongSize = true
          this.selectedImage = false
          this.messageImage = "Slika je veća od 300x300px";
          return;
        }
        this.isWrongSize = false;
      }
  }

  submitImage(){
    const formData = new FormData();
    if(this.image){
      formData.append('avatar_image', this.image, this.image.name)
      this.userService.uploadAvatarImage(formData, this.username).subscribe(resp=>{
        alert(resp['message'])
      })
    }
  }

}
