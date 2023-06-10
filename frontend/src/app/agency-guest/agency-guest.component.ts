import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { Comment } from '../model/comment';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-agency-guest',
  templateUrl: './agency-guest.component.html',
  styleUrls: ['./agency-guest.component.css']
})
export class AgencyGuestComponent implements OnInit {

  constructor(private commentsService: CommentService, private userService: UserService, private activeRouter: ActivatedRoute) { }

  name: string;
  comments: Comment[] = [];
  agency: User = new User();
  client: string;

  ngOnInit(): void {
    this.name = this.activeRouter.snapshot.paramMap.get('username')
    this.userService.getUserByUsername(this.name).subscribe((data: User)=>{
      this.agency = data
    })
    this.commentsService.getCommentsForAgency(this.name).subscribe((data: Comment[])=>{
      this.comments = data;
    })
    this.client = sessionStorage.getItem('username');
    sessionStorage.setItem('agency_username', this.name);
  }

}
