import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agency-guest',
  templateUrl: './agency-guest.component.html',
  styleUrls: ['./agency-guest.component.css']
})
export class AgencyGuestComponent implements OnInit {

  constructor(private activeRouter: ActivatedRoute) { }

  name: string;

  ngOnInit(): void {
    this.name = this.activeRouter.snapshot.paramMap.get('username')
  }

}
