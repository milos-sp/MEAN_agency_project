import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../model/property';
import { RequestService } from '../request.service';
import { Request } from '../model/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private propertyService: PropertyService, private requestService: RequestService) { }

  properties: Property[] = [];
  property_id: string;
  date_start: string;
  date_end: string;
  message: string = null;
  property: Property = new Property()
  index: number = 0;

  ngOnInit(): void {
    this.propertyService.getPropertiesByUsername(sessionStorage.getItem('username')).subscribe((data: Property[])=>{
      this.properties = data
    })
  }

  sendRequest(){
    this.property = this.properties[this.index]
    if(!this.date_start || !this.date_end){
      this.message = 'Unesite oba datuma';
      return;
    }
    if(new Date(this.date_start) > new Date(this.date_end)){
      this.message = 'Datum pocetka je posle datuma kraja';
      return;
    }
    let req = new Request();
    req.date_start = this.date_start;
    req.date_end = this.date_end;
    req.property_id = this.property._id;
    req.agency_username = sessionStorage.getItem('agency_username');
    req.client_username = sessionStorage.getItem('username');
    req.offer = null;
    req.status = 0;
    req.active = false;
    let colors = new Array<string>(this.property.rooms);
    for (let i = 0; i < this.property.rooms; i++) {
      colors[i] = 'transparent'
    }
    req.rooms_colors = colors
    this.requestService.addRequest(req).subscribe((resp=>{
      this.message = resp['message'];
      this.date_start = this.date_end = null;
    }))
  }

}
