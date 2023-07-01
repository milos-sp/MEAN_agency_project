import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../request.service';
import { Request } from '../model/request';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Property } from '../model/property';
import { PropertyService } from '../property.service';
import { WorkerService } from '../worker.service';
import { Worker } from '../model/worker';

@Component({
  selector: 'app-agency-job',
  templateUrl: './agency-job.component.html',
  styleUrls: ['./agency-job.component.css']
})
export class AgencyJobComponent implements OnInit {

  constructor(private requestService: RequestService, private userService: UserService, private propertyService: PropertyService, 
    private workerService: WorkerService) { }

  agency: User = new User();
  myRequests: Request[] = [];
  myWorkers: Worker[] = [];
  userMap = new Map<string, string>();
  emailMap = new Map<string, string>();
  propertyMap = new Map<string, string>();
  //
  offer: number = null;
  message: string = null;
  message2: string = null;
  message3: string = null;
  selectedRequest: Request = null;
  selectedWorker: string = null;
  selectedRoom: number = null;
  selectedRoom2: number = null;
  //za skicu
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;
  private ctx: CanvasRenderingContext2D;

  ngOnInit(): void {
    let user = new User()
    let property = new Property()
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((user: User)=>{
      this.agency = user
    })
    this.requestService.getRequestsA(sessionStorage.getItem('username')).subscribe((data: Request[])=>{
      this.myRequests = data
      this.myRequests.forEach(el => {
        this.userService.getUserByUsername(el.client_username).subscribe((userDB: User)=>{
          user = userDB
          this.userMap.set(el.client_username, user.firstname + ' ' + user.lastname)
          this.emailMap.set(el.client_username, user.email)
        })
        this.propertyService.getPropertyById(el.property_id).subscribe((propertyDB: Property)=>{
          property = propertyDB
          this.propertyMap.set(el.property_id, 'Adresa: ' + property.address + ', kvadratura: ' + property.area + ', broj soba: ' + property.rooms)
        })
      });
    })
    this.workerService.getAvailableWorkersForAgency(sessionStorage.getItem('username')).subscribe((workers: Worker[])=>{
      this.myWorkers = workers
    })
  }

  reject(request: Request){
    this.requestService.reject(request._id).subscribe((resp=>{
      window.location.reload()
    }))
  }

  sendOffer(request: Request){
    if(this.offer == null || this.offer < 0){
      this.message = 'Unesite ispravnu vrednost ponude'
      return;
    }
    this.message = null;
    this.requestService.sendOffer(request._id, this.offer).subscribe((resp=>{
      window.location.reload()
    }))
  }

  redRooms(r: Request){
    let num = 0;
    for (let i = 0; i < r.rooms_colors.length; i++) {
      if(r.rooms_colors[i]=="red") num++;
    }
    return num;
  }

  showSketch(r: Request){
    let property = new Property();
    this.selectedRequest = r;
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    let green_num = this.redRooms(r)
    this.propertyService.getPropertyById(r.property_id).subscribe((data: Property)=>{
      property = data;
      this.ctx.strokeStyle = "black";
      //iscrtavanje na canvasu
      for (let i = 0; i < r.rooms_colors.length; i++) {
        const color = this.myWorkers.length >= r.rooms_colors.length - green_num || r.rooms_colors[i]!="transparent" ? r.rooms_colors[i] : "yellow";
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

  addWorker(){
    if(!this.selectedRoom || !this.selectedWorker){
      this.message2 = "Odaberite sve podatke";
      return;
    }
    this.message2 = null;
    this.workerService.hireWorker(this.selectedWorker, this.selectedRequest.property_id, this.selectedRoom).subscribe((resp=>{
       this.workerService.getAvailableWorkersForAgency(sessionStorage.getItem('username')).subscribe((workers: Worker[])=>{
         this.myWorkers = workers
       })
      console.log(resp['message'])
    }))
    this.requestService.startJob(this.selectedRequest._id, this.selectedRoom).subscribe((resp=>{
      this.selectedRequest.rooms_colors[this.selectedRoom] = "red"
      this.showSketch(this.selectedRequest)
    }))
  }

  removeWorker(){
    if(!this.selectedRoom2){
      this.message3 = "Odaberite sobu";
      return;
    }
    this.workerService.dismissWorker(this.selectedRequest.property_id, this.selectedRoom2).subscribe((resp=>{
      this.workerService.getAvailableWorkersForAgency(sessionStorage.getItem('username')).subscribe((workers: Worker[])=>{
        this.myWorkers = workers
      })
      console.log(resp['message'])
    }))
    this.requestService.endJob(this.selectedRequest._id, this.selectedRoom2).subscribe((resp=>{
      this.selectedRequest.rooms_colors[this.selectedRoom2] = "green"
      this.showSketch(this.selectedRequest)
    }))
  }
}
