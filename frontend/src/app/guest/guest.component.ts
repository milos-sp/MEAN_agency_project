import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { ImageService } from '../image.service';
import { Image } from '../model/image';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private router: Router) { 

  }

  agencies: Array<User>;
  images: Array<Image>;
  imagesMap: Map<String, String> = new Map<String, String>();
  //za pretragu
  agency: string = "";
  address: string = "";

  ngOnInit(): void {
    this.userService.getAllAgencies().subscribe((data: User[])=>{
      this.agencies = data;
    })
    this.imageService.getImages().subscribe((data: Image[])=>{
      this.images = data;
      this.images.forEach(element => {
        this.imagesMap.set(element['username'], element['imageUrl'])
      });
    })
  }

  search(){
    this.userService.searchAgencies(this.agency, this.address).subscribe((data: User[])=>{
      this.agencies = data;
    })
  }

}
