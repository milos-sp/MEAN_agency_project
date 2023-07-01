import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerRequestService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getRequest(agency){
    return this.http.get(`${this.uri}/workers/getRequest?agency=${agency}`)
  }

  addRequest(agency, increment){
    const data = {
      agency: agency,
      increment: increment
    }
    return this.http.post(`${this.uri}/workers/addRequest`, data)
  }
}
