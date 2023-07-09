import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Request } from '../model/request';
import { RequestService } from '../request.service';
import { Property } from '../model/property';
import { PropertyService } from '../property.service';
import { CommentService } from '../comment.service';
import { Comment } from '../model/comment';
import { CancelJob } from '../model/cancel-job';

@Component({
  selector: 'app-client-job',
  templateUrl: './client-job.component.html',
  styleUrls: ['./client-job.component.css']
})
export class ClientJobComponent implements OnInit {

  constructor(private requestService: RequestService, private propertyService: PropertyService, private commentService: CommentService) { }

  content: number;
  myRequests: Request[] = [];
  propertyMap = new Map<string, string>();
  //za skicu
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  private ctx: CanvasRenderingContext2D;
  //za komentar
  selectedJob: boolean;
  comment: Comment = new Comment();
  hasComment: boolean;
  message: string = null;

  reason: string = null;
  selectedR: Request = new Request();

  ngOnInit(): void {
    this.content = 1;
    this.selectedJob = false;
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
    this.selectedJob = false;
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

  stopJob(r: Request){
    this.selectedJob = true
    this.selectedR = r
  }

  cancel(){
    if(this.reason == null){
      this.message = "Unesite razlog za otkazivanje";
      return;
    }
    let stopJobR = new CancelJob()
    stopJobR.job_id = this.selectedR._id
    stopJobR.client = this.selectedR.client_username
    stopJobR.agency = this.selectedR.agency_username
    stopJobR.reason = this.reason

    this.requestService.stopJob(stopJobR).subscribe((resp=>{
      window.location.reload()
    }))
  }

  showComment(r: Request){
    this.commentService.getComment(r.agency_username, sessionStorage.getItem('username')).subscribe((data: Comment)=>{
      this.selectedJob = true
      if(data == null){
        this.comment.agency_username = r.agency_username
        this.comment.comment = null
        this.comment.rating = 1
        this.hasComment = false
      }else{
        this.hasComment = true
        this.comment = data
      }
    })
  }

  editComment(){
    this.commentService.editComment(this.comment).subscribe((resp=>{
      window.location.reload()
    }))
  }

  addComment(){
    this.message = null;
    if(this.comment.comment == null){
      this.message = "Unesite tekst komentara";
      return;
    }
    this.comment.username = sessionStorage.getItem('username')
    this.commentService.addComment(this.comment).subscribe((resp=>{
      window.location.reload()
    }))
  }

}
