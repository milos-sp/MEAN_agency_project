import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from './model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getPropertiesByUsername(username){
    const data = {
      owner: username
    }
    return this.http.post(`${this.uri}/properties/getPropertiesByUsername`, data)
  }

  getAllProperties(){
    return this.http.get(`${this.uri}/properties/getAllProperties`)
  }

  deleteProperty(id){
    return this.http.post(`${this.uri}/properties/deleteProperty`, {id: id})
  }

  addProperty(property: Property){
    const data = {
      property: property
    }
    return this.http.post(`${this.uri}/properties/addProperty`, data)
  }
}
