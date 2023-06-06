import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../property.service';
import { Property } from '../model/property';
import { Router } from '@angular/router';
import { Rectangle } from '../model/rectangle';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  constructor(private propertyService: PropertyService, private router: Router) { }

  type: string = 'stan';
  address: string = null;
  area: number = null;
  rooms: number = null;
  property: Property;
  layout: Rectangle[] = [];
  doors: Rectangle[] = [];
  //za skicu
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  private ctx: CanvasRenderingContext2D;

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
    {x: 80, y: 150, width: 10, height: 10}
  ]
  doors2: Rectangle[] = [
    {x: 80, y: 100, width: 10, height: 10},
    {x: 130, y: 100, width: 10, height: 10}
  ]
  doors1: Rectangle[] = [
    {x: 80, y: 100, width: 10, height: 10}
  ]
  //za JSON fajl
  file: File;
  propertyJSON: Property = null;

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = "brown";
    this.ctx.strokeStyle = "black";
    this.propertyService.getAllProperties().subscribe((data: Property[])=>{
      this.property = data[data.length-1]
    })
  }

  roomsChanged(event){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(event.target.value < 0 || event.target.value > 3){
      alert("Broj soba mora biti između 1 i 3")
    }
    if(event.target.value == 1){
      this.layout = this.layout1
      this.doors = this.doors1
    }else if(event.target.value == 2){
      this.layout = this.layout2
      this.doors = this.doors2
    }else if(event.target.value == 3){
      this.layout = this.layout3
      this.doors = this.doors3
    }
    this.layout.forEach(element => {
      this.ctx.strokeRect(element.x, element.y, element.width, element.height)
    });
    this.doors.forEach(elem=>{
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height)
    })
    
  }

  addProperty(){
    const property: Property = new Property();
    if(!this.address || !this.area || !this.rooms){
      alert("Morate uneti sve podatke")
      return;
    }
    property.owner = sessionStorage.getItem('username');
    property.id = this.property.id + 1;
    property.address = this.address;
    property.area = this.area;
    property.rooms = this.rooms;
    property.type = this.type;
    property.layout = this.layout;
    property.doors = this.doors;
    this.propertyService.addProperty(property).subscribe((resp=>{
      alert(resp['message'])
    }))
    window.location.reload()
  }

  fileChanged(event){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.file = event.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsText(this.file, 'UTF-8')
    fileReader.onloadend = ()=>{
      this.propertyJSON = JSON.parse(fileReader.result.toString()) //bio je problem u onim prvim []
      this.propertyJSON.owner = sessionStorage.getItem('username')
      this.layout = this.propertyJSON.layout;
      this.doors = this.propertyJSON.doors;
      //iscrtavanje na canvasu
      this.propertyJSON.layout.forEach(element => {
        this.ctx.strokeRect(element.x, element.y, element.width, element.height)
      })
      this.propertyJSON.doors.forEach(elem=>{
        this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height)
      })
    }
  }

  addPropertyJSON(){
    if(!this.propertyJSON){
      alert('Morate prvo uneti JSON fajl')
    }
    this.propertyJSON.id = this.property.id + 1;
    this.propertyService.addProperty(this.propertyJSON).subscribe((resp=>{
      alert(resp['message'])
    }))
    window.location.reload()
  }
}
