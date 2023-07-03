import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkerService } from '../worker.service';
import { Worker } from '../model/worker';

@Component({
  selector: 'app-worker-info',
  templateUrl: './worker-info.component.html',
  styleUrls: ['./worker-info.component.css']
})
export class WorkerInfoComponent implements OnInit {

  constructor(private workerService: WorkerService, private activeRouter: ActivatedRoute) { }

  id: string;
  worker: Worker = new Worker();
  admin: boolean;

  ngOnInit(): void {
    this.admin = sessionStorage.getItem('username') == null;
    this.id = this.activeRouter.snapshot.paramMap.get('id')
    this.workerService.getWorker(this.id).subscribe((data: Worker)=>{
      this.worker = data
    })
  }

  edit(){
    this.workerService.editWorker(this.worker).subscribe((resp=>{
      this.workerService.getWorker(this.id).subscribe((data: Worker)=>{
        this.worker = data
        console.log(resp['message'])
      })
    }))
  }

}
