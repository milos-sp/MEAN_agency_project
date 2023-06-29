import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Request } from '../model/request';
import { RequestService } from '../request.service';
import { Property } from '../model/property';
import { PropertyService } from '../property.service';

@Component({
  selector: 'app-client-job',
  templateUrl: './client-job.component.html',
  styleUrls: ['./client-job.component.css']
})
export class ClientJobComponent implements OnInit {

  constructor(private requestService: RequestService, private propertyService: PropertyService) { }

  content: number;
  myRequests: Request[] = [];
  propertyMap = new Map<string, string>();
  //za skicu
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.content = 1;
    let property = new Property();
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = "brown";
    this.ctx.strokeStyle = "black";
    this.requestService.getRequestsC(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
      this.myRequests = data
      this.myRequests.forEach(el => {
        this.propertyService.getPropertyById(el.property_id).subscribe((propertyDB: Property)=>{
          property = propertyDB
          this.propertyMap.set(el.property_id, 'Adresa: ' + property.address + ', kvadratura: ' + property.area + ', broj soba: ' + property.rooms)
        })
      });
    })
  }

  changeContent(content){
    this.content = content;
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  rejectOffer(r: Request){
    this.requestService.rejectOffer(r._id).subscribe((resp)=>{
      this.requestService.getRequestsC(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
        this.myRequests = data
      })
    })
  }

  acceptOffer(r: Request){
    this.requestService.acceptOffer(r._id).subscribe((resp)=>{
      this.requestService.getRequestsC(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
        this.myRequests = data
      })
    })
  }

  showSketch(r: Request){
    let property = new Property();
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
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

  checkProgress(r: Request){
    for (let i = 0; i < r.rooms_colors.length; i++) {
      if(r.rooms_colors[i]!="green"){
        return false;
      }
    }
    return true;
  }

  payJob(r: Request){
    this.requestService.pay(r._id).subscribe((resp)=>{
      this.requestService.getRequestsC(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
        const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.myRequests = data
      })
    })
  }

}
