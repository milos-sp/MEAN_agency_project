import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../model/request';
import { PropertyService } from '../property.service';
import { Property } from '../model/property';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  constructor(private requestService: RequestService, private propertyService: PropertyService) { }

  allJobs: Request[] = [];
  propertyMap = new Map<string, string>();
  //za skicu
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    let property = new Property()
    this.requestService.getAllJobs().subscribe((data: Request[])=>{
      this.allJobs = data
      this.allJobs.forEach(el => {
        this.propertyService.getPropertyById(el.property_id).subscribe((propertyDB: Property)=>{
          property = propertyDB
          this.propertyMap.set(el.property_id, 'Adresa: ' + property.address + ', kvadratura: ' + property.area + ', broj soba: ' + property.rooms)
        })
      });
    })
  }

  showSketch(r: Request){
    let property = new Property();
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = "brown";
    this.ctx.strokeStyle = "black";
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.propertyService.getPropertyById(r.property_id).subscribe((data: Property)=>{
      property = data;
      this.ctx.strokeStyle = "black";
      //iscrtavanje na canvasu
      for (let i = 0; i < r.rooms_colors.length; i++) {
        const color = r.rooms_colors[i];
        this.ctx.fillStyle = color;
        this.ctx.fillRect(property.layout[i].x, property.layout[i].y, property.layout[i].width, property.layout[i].height);
      }
      property.layout.forEach(element => {
        this.ctx.strokeRect(element.x, element.y, element.width, element.height)
      })
      this.ctx.fillStyle = "brown";
      property.doors.forEach(elem=>{
        this.ctx.fillRect(elem.x, elem.y, elem.width, elem.height)
      })
    })
  }

}
