import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../worker.service';
import { Worker } from '../model/worker';
import { User } from '../model/user';
import { UserService } from '../user.service';
import { WorkerRequestService } from '../worker-request.service';
import { WorkerRequest } from '../model/worker-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  constructor(private workerService: WorkerService, private userService: UserService, private workerRequestService: WorkerRequestService, 
    private router: Router) { }

  workers: Worker[] = [];
  agency: User = new User();
  free_space: number;
  firstname: string = null;
  lastname: string = null;
  occupation: string = null;
  email: string = null;
  phone: string = null;
  message: string = null;
  //za nova mesta
  increment: number = null;
  request_exist: boolean;

  ngOnInit(): void {
    this.workerService.getWorkersForAgency(sessionStorage.getItem('username')).subscribe((data: Worker[])=>{
      this.workers = data
      this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
        this.agency = data
        this.free_space = this.agency.workers_number - this.workers.length
        this.workerRequestService.getRequest(sessionStorage.getItem('username')).subscribe((data: WorkerRequest)=>{
          if(data) this.request_exist = true;
          else this.request_exist = false;
        })
      })
    })
  }

  addSpace(){
    if(this.increment < 1){
      this.message = "Unesite broj veći od nule";
      return;
    }
    this.message = null;
    this.workerRequestService.addRequest(this.agency.username, this.increment).subscribe((resp=>{
      window.location.reload()
    }))
  }

  deleteWorker(w: Worker){
    this.workerService.deleteWorker(w._id).subscribe((resp=>{
      this.workerService.getWorkersForAgency(sessionStorage.getItem('username')).subscribe((data: Worker[])=>{
        this.workers = data
      })
    }))
  }

  insertWorker(){
    if(!this.firstname || !this.lastname || !this.occupation || !this.phone || !this.email){
      this.message = "Unesite sve potrebne podatke";
      return;
    }
    let worker = new Worker()
    worker.firstname = this.firstname
    worker.lastname = this.lastname
    worker.email = this.email
    worker.phone = this.phone
    worker.occupation = this.occupation
    worker.agency = this.agency.username
    worker.property = null;
    worker.room = null;
    this.workerService.insertWorker(worker).subscribe((resp=>{
      window.location.reload()
    }))
  }

  editWorker(w: Worker){
    this.router.navigate(['workers/' + w._id])
  }

}
