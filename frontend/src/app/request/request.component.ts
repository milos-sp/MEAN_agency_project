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

  ngOnInit(): void {
    this.propertyService.getPropertiesByUsername(sessionStorage.getItem('username')).subscribe((data: Property[])=>{
      this.properties = data
      this.property_id = this.properties[0]._id
    })
  }

  sendRequest(){
    if(!this.date_start || !this.date_end){
      this.message = 'Unesite oba datuma';
      return;
    }
    let req = new Request();
    req.date_start = this.date_start;
    req.date_end = this.date_end;
    req.property_id = this.property_id;
    req.agency_username = sessionStorage.getItem('agency_username');
    req.client_username = sessionStorage.getItem('username');

    this.requestService.addRequest(req).subscribe((resp=>{
      this.message = resp['message'];
      this.date_start = this.date_end = null;
    }))
  }

}
