import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor() { }

  address: Address;
  country: string;

  ngOnInit(): void {
    //this.country = sessionStorage.getItem('country')
  }

}
