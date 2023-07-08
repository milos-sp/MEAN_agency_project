import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../model/property';
import { Rectangle } from '../model/rectangle';

@Component({
  selector: 'app-property-info',
  templateUrl: './property-info.component.html',
  styleUrls: ['./property-info.component.css']
})
export class PropertyInfoComponent implements OnInit {

  constructor(private propertyService: PropertyService, private activeRouter: ActivatedRoute) { }

  id: string = null;
  property: Property = new Property();
  message: string = null;
  //za skicu
  layout3: Rectangle[] = [
    {x: 10, y: 10, width: 100, height: 100},
    {x: 110, y: 10, width: 80, height: 100},
    {x: 10, y:110, width: 80, height: 70}
  ]
  layout2: Rectangle[] = [
    {x: 10, y: 10, width: 100, height: 100},
    {x: 110, y: 10, width: 80, height: 100}
  ]
  layout1: Rectangle[] = [
    {x: 10, y: 10, width: 100, height: 100}
  ]
  doors3: Rectangle[] = [
    {x: 50, y: 100, width: 10, height: 10},
    {x: 180, y: 80, width: 10, height: 10},
    {x: 80, y: 150, width: 10, height: 10},
    {x: 110, y: 70, width: 10, height: 10}
  ]
  doors2: Rectangle[] = [
    {x: 80, y: 100, width: 10, height: 10},
    {x: 130, y: 100, width: 10, height: 10}
  ]
  doors1: Rectangle[] = [
    {x: 80, y: 100, width: 10, height: 10}
  ]

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id')
    this.propertyService.getPropertyById(this.id).subscribe((data: Property)=>{
      this.property = data
    })
  }

  edit(){
    if(this.property.area < 0){
      this.message = "Unesite ispravnu vrednost za kvadraturu";
      return;
    }
    if(this.property.rooms < 1 || this.property.rooms > 3){
      this.message = "Broj soba mora biti između 1 i 3";
      return;
    }
    if(this.property.rooms == 1){
      this.property.layout = this.layout1;
      this.property.doors = this.doors1;
    }else if(this.property.rooms == 2){
      this.property.layout = this.layout2;
      this.property.doors = this.doors2;
    }else{
      this.property.layout = this.layout3;
      this.property.doors = this.doors3;
    }
    this.propertyService.editProperty(this.property).subscribe((resp=>{
      window.location.reload()
    }))
  }

}
