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
  message: string = null;
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
    this.message = null;
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
    this.message = null;
    if(!this.propertyJSON){
      alert('Morate prvo uneti JSON fajl')
      this.message = 'Morate prvo uneti JSON fajl';
      return;
    }
    if(this.propertyJSON.rooms == 1){
      //samo provera za vrata
      this.doors.forEach(elem => {
        if(elem.x < this.layout[0].x || elem.x > this.layout[0].x + this.layout[0].width - 10 ||
          (elem.y != this.layout[0].y && elem.y != this.layout[0].y + this.layout[0].height - 10)){
            this.message = 'Dimenzije skice nisu ispravne';
            return;
        }
      });
    }else{
      //provera i za vrata i za zidove
      let wallB: boolean = false;
      for (let index = 0; index < this.layout.length; index++) {
        let elem = this.layout[index]
        for (let index1 = 0; index1 < this.layout.length; index1++) {
          if(index == index1) continue;
          let elem1 = this.layout[index1]
          if(this.overlapping(elem, elem1)){
            wallB = true;
            break;
          }
          if(!this.touching(elem, elem1)){
            wallB = true;
          }else{
            wallB = false;
            break;
          }
          
        }
        if(wallB){
          this.message = 'Koordinate zidova nisu ispravne';
          return;
        }
      }
      //za vrata
      let doorB: boolean = false;
      for (let index = 0; index < this.doors.length; index++) {
        let elem = this.doors[index]
        for (let index1 = 0; index1 < this.layout.length; index1++) {
          let elem1 = this.layout[index1]
          if(elem.x < elem1.x || elem.x > elem1.x + elem1.width - 10 ||
            (elem.y != elem1.y && elem.y != elem1.y + elem1.height - 10)){
              doorB = true;
          }else{
            doorB = false;
            break;
          }
        }
        if(doorB){
          this.message = 'Pozicije vrata nisu ispravne';
          return;
        }
      }
    }
    
    this.propertyJSON.id = this.property.id + 1;
    this.propertyService.addProperty(this.propertyJSON).subscribe((resp=>{
      alert(resp['message'])
    }))
    window.location.reload() 
  }

  touching(r1: Rectangle, r2: Rectangle):boolean{
    if(r1.x > r2.x + r2.width || r2.x > r1.x + r1.width) return false;
    if(r1.y > r2.y + r2.height || r2.y > r1.y + r1.height) return false;
    return true;
  }

  overlapping(r1: Rectangle, r2: Rectangle):boolean{
    if(r1.x >= r2.x + r2.width || r2.x >= r1.x + r1.width) return false;
    if(r1.y >= r2.y + r2.height || r2.y >= r1.y + r1.height) return false;
    return true;
  }
}
