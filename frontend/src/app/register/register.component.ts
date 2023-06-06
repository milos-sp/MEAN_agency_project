import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Address } from '../model/address';
import { Router } from '@angular/router';

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
  message: string = "";
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

  ngOnInit(): void {
  }

  register(){
    let regPassword = new RegExp(/^(?=[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[A-Z]).{7,12}$/)
    if(!this.username || !this.password || !this.email || !this.telephone){
      this.message = "Sva polja su obavezna";
      return;
    }
    if(!this.type){
      this.message = "Morate odabrati tip";
      return;
    }else{
      if(!regPassword.test(this.password)){
        this.message = "Lozinka nije u ispravnom formatu";
        return;
      }
      this.message = "";
      if(this.type=='klijent'){
        if(!this.firstname || !this.lastname){
          this.message = "Unesite ime i prezime";
        }
      }else{
        if(!this.address){
          this.message = "Popunite sva polja vezana za adresu";
        }
      }
    }
    if(this.password != this.password2){
      this.message = "Lozinke se ne poklapaju";
      return;
    }
    this.address_string = this.address.country + ' ' + this.address.city + ' ' + this.address.street + ' ' + this.address.street_n;
    this.userService.register(this.username, this.password, this.email, this.telephone, this.type, this.firstname, this.lastname,
      this.agency, this.address, this.agencyID, this.description, this.address_string).subscribe(resp=>{
        if(!this.selectedImage){
          this.userService.addDefaultImage(this.username, 'http://127.0.0.1:4000/uploads/avatar_default.png')
        }
        alert(resp['message'])
        this.router.navigate([''])
      })
  }

  imageSelected(event){
    if(event.target.value){
      this.selectedImage = true;
      this.image = <File>event.target.files[0];
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
