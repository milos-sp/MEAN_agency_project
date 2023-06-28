import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getWorkersForAgency(agency){
    return this.http.post(`${this.uri}/workers/getWorkersForAgency`, {agency: agency})
  }

  getAvailableWorkersForAgency(agency){
    return this.http.post(`${this.uri}/workers/getAvailableWorkersForAgency`, {agency: agency})
  }

  hireWorker(id, property, room){
    const data = {
      id: id,
      property: property,
      room: room
    }
    return this.http.post(`${this.uri}/workers/hireWorker`, data)
  }
}