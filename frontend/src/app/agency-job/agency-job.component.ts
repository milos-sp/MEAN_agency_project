import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../model/request';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Property } from '../model/property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-agency-job',
  templateUrl: './agency-job.component.html',
  styleUrls: ['./agency-job.component.css']
})
export class AgencyJobComponent implements OnInit {

  constructor(private requestService: RequestService, private userService: UserService, private propertyService: PropertyService) { }

  myRequests: Request[] = [];
  userMap = new Map<string, string>();
  emailMap = new Map<string, string>();
  propertyMap = new Map<string, string>();
  //
  offer: number = null;
  message: string = null;

  ngOnInit(): void {
    let user = new User()
    let property = new Property()
    this.requestService.getRequestsA(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
      this.myRequests = data
      this.myRequests.forEach(el => {
        this.userService.getUserByUsername(el.client_username).subscribe((userDB: User)=>{
          user = userDB
          this.userMap.set(el.client_username, user.firstname + ' ' + user.lastname)
          this.emailMap.set(el.client_username, user.email)
        })
        this.propertyService.getPropertyById(el.property_id).subscribe((propertyDB: Property)=>{
          property = propertyDB
          this.propertyMap.set(el.property_id, 'Adresa: ' + property.address + ', kvadratura: ' + property.area + ', broj soba: ' + property.rooms)
        })
      });
    })
  }

  reject(request: Request){
    this.requestService.reject(request._id).subscribe((resp=>{
      window.location.reload()
    }))
  }

  sendOffer(request: Request){
    if(this.offer == null || this.offer < 0){
      this.message = 'Unesite ispravnu vrednost ponude'
      return;
    }
    this.message = null;
    this.requestService.sendOffer(request._id, this.offer).subscribe((resp=>{
      window.location.reload()
    }))
  }

}
