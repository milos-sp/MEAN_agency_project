import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { ImageService } from '../image.service';
import { ImageDb } from '../model/image';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) { 

  }

  agencies: Array<User>;
  images: Array<ImageDb>;
  imagesMap: Map<String, String> = new Map<String, String>();
  //za pretragu
  agency: string = "";
  address: string = "";
  client: string;

  ngOnInit(): void {
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.agencies = data;
    })
    this.imageService.getImages().subscribe((data: ImageDb[])=>{
      this.images = data;
      this.images.forEach(element => {
        this.imagesMap.set(element['username'], element['imageUrl'])
      });
    })
    this.client = sessionStorage.getItem('username');
  }

  search(){
    this.userService.searchAgencies(this.agency, this.address).subscribe((data: User[])=>{
      this.agencies = data;
    })
  }

  sort(type: string){
    if(type=='asc'){
      this.agencies.sort((a, b)=> (a.agency > b.agency)?1:((b.agency > a.agency)?-1:0))
    }else{
      this.agencies.sort((a, b)=> (a.agency < b.agency)?1:((b.agency < a.agency)?-1:0))
    }
  }

}
