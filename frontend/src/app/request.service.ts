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

  getRequestsA(agency){
    return this.http.post(`${this.uri}/requests/getRequestsA`, {agency_username: agency})
  }

  reject(id){
    return this.http.post(`${this.uri}/requests/reject`, {id: id})
  }

  sendOffer(id, offer){
    const data = {
      id: id,
      offer: offer
    }
    return this.http.post(`${this.uri}/requests/sendOffer`, data)
  }
}
