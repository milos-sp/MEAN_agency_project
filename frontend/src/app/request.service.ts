import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  addRequest(request){
    const data = {
      request: request
    }
    return this.http.post(`${this.uri}/requests/addRequest`, data)
  }
}
