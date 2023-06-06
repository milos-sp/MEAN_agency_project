import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Property } from '../model/property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})


export class PropertyComponent implements OnInit {

  constructor(private propertyService: PropertyService) { }

  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  private ctx: CanvasRenderingContext2D;

  properties: Property[] = [];

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = "brown";
    this.ctx.strokeStyle = "black";
    this.propertyService.getPropertiesByUsername(sessionStorage.getItem('username')).subscribe((data: Property[])=>{
      this.properties = data
    })
  }

  showSketch(property: Property){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = "brown";
    this.ctx.strokeStyle = "black";
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    property.layout.forEach(elem=>{
      this.ctx.strokeRect(elem.x, elem.y, elem.width, elem.height)
    })
    property.doors.forEach(elem=>{
      this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height)
    })
  }

  delete(property: Property){
    this.propertyService.deleteProperty(property.id).subscribe((resp=>{
      alert(resp['message'])
    }))
    window.location.reload()
  }

}
