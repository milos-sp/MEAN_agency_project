import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getImages(){
    return this.http.get(`${this.uri}/image/getImages`)
  }

  getImageByUsername(username){
    return this.http.post(`${this.uri}/image/getImageByUsername`, {username: username})
  }
}
