import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute) { }

  address: Address;
  country: string;
  name: string;

  ngOnInit(): void {
    //this.country = sessionStorage.getItem('country')
    
  }

}
