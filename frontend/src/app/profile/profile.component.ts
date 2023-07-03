import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';
import { Image } from '../model/image';
import { ImageService } from '../image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker } from '../model/worker';
import { WorkerService } from '../worker.service';
import { WorkerRequestService } from '../worker-request.service';
import { WorkerRequest } from '../model/worker-request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private imageService: ImageService, private workerService: WorkerService, 
    private workerReqService: WorkerRequestService, private activatedRouter: ActivatedRoute, private router: Router) { }

  user: User = new User();
  image: Image = new Image();
  admin: boolean;
  workers: Worker[] = [];
  workernew: Worker = new Worker();
  message: string = null;
  workerReq: WorkerRequest = new WorkerRequest();
  selectedImage: boolean = false;
  imageUpdate: File;

  ngOnInit(): void {
    if(this.activatedRouter.snapshot.paramMap.get('username')==null){
      this.admin = false
      this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe((data: User)=>{
        this.user = data
      })
      this.imageService.getImageByUsername(sessionStorage.getItem('username')).subscribe((data: Image)=>{
        this.image = data
      })
    }else{
      this.admin = true
      this.userService.getUserByUsername(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: User)=>{
        this.user = data
      })
      this.imageService.getImageByUsername(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: Image)=>{
        this.image = data
      })
      this.workerService.getWorkersForAgency(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: Worker[])=>{
        this.workers = data
      })
      this.workerReqService.getRequest(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: WorkerRequest)=>{
        this.workerReq = data
      })
    }
  }

  editUser(isClient: boolean){
    if(isClient){
      this.userService.editClient(this.user).subscribe((resp=>{
        window.location.reload()
      }))
    }else{
      this.userService.editAgency(this.user).subscribe((resp=>{
        window.location.reload()
      }))
    }
  }

  imageSelected(event){
    if(event.target.value){
      this.selectedImage = true;
      this.imageUpdate = <File>event.target.files[0];
    }
  }

  editImage(){
    const formData = new FormData();
    if(this.imageUpdate){
      formData.append('avatar_image', this.imageUpdate, this.imageUpdate.name)
      this.imageService.deleteImage(this.user.username).subscribe((resp=>{
        this.userService.uploadAvatarImage(formData, this.user.username).subscribe(resp=>{
          window.location.reload()
        })
      }))
    }
  }

  editWorker(w: Worker){
    this.router.navigate(['workers/' + w._id])
  }

  deleteWorker(w: Worker){
    this.workerService.deleteWorker(w._id).subscribe((resp=>{
      this.workerService.getWorkersForAgency(this.activatedRouter.snapshot.paramMap.get('username')).subscribe((data: Worker[])=>{
        this.workers = data
      })
    }))
  }

  insertWorker(){
    if(!this.workernew.firstname || !this.workernew.lastname || !this.workernew.occupation 
      || !this.workernew.phone || !this.workernew.email){
      this.message = "Unesite sve potrebne podatke";
      return;
    }
    this.message = null;
    this.workernew.agency = this.activatedRouter.snapshot.paramMap.get('username');
    this.workernew.property = null;
    this.workernew.room = null;
    this.workerService.insertWorker(this.workernew).subscribe((resp=>{
      window.location.reload()
    }))
  }

  accept(){
    this.workerReqService.acceptExpansionRequest(this.workerReq.agency, this.workerReq.increment).subscribe((resp=>{
      console.log(resp['message'])
      this.workerReqService.deleteRequest(this.workerReq.agency).subscribe((resp=>{
        window.location.reload()
      }))
    }))
  }

  reject(){
    this.workerReqService.deleteRequest(this.workerReq.agency).subscribe((resp=>{
      window.location.reload()
    }))
  }

}
