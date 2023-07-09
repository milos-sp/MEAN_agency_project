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

  getRequestsC(client){
    return this.http.post(`${this.uri}/requests/getRequestsC`, {client_username: client})
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

  rejectOffer(id){
    return this.http.post(`${this.uri}/requests/rejectOffer`, {id: id})
  }

  acceptOffer(id){
    return this.http.post(`${this.uri}/requests/acceptOffer`, {id: id})
  }

  startJob(id, room){
    const data = {
      id: id,
      room: room
    }
    return this.http.post(`${this.uri}/requests/startJob`, data)
  }

  endJob(id, room){
    const data = {
      id: id,
      room: room
    }
    return this.http.post(`${this.uri}/requests/endJob`, data)
  }

  pay(id){
    return this.http.post(`${this.uri}/requests/pay`, {id: id})
  }

  getAllJobs(){
    return this.http.get(`${this.uri}/requests/getAllJobs`)
  }

  deleteRequestsWithProperty(property_id){
    return this.http.post(`${this.uri}/requests/deleteRequests`, {property_id: property_id})
  }

  stopJob(request){
    return this.http.post(`${this.uri}/requests/stopJob`, request)
  }

  getCancelRequests(){
    return this.http.get(`${this.uri}/requests/getCancelRequests`)
  }

  rejectStopRequest(id){
    return this.http.get(`${this.uri}/requests/rejectStopRequest?id=${id}`)
  }

  deleteJob(id){
    return this.http.get(`${this.uri}/requests/deleteJob?id=${id}`)
  }
}
