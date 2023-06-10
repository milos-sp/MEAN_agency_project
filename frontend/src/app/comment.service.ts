import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getCommentsForAgency(agency){
    return this.http.post(`${this.uri}/comments/getCommentsForAgency`, {agency: agency})
  }
}
