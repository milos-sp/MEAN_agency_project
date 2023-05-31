import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/login`, data)
  }

  register(username, password, email, telephone, type, firstname, lastname, agency, address, agencyID, description){
    const data = {
      username: username,
      password: password,
      email: email,
      telephone: telephone,
      type: type,
      firstname: firstname,
      lastname: lastname,
      agency: agency,
      address: address,
      agencyID: agencyID,
      description: description
    }
    return this.http.post(`${this.uri}/users/register`, data)
  }

  getUsers(){
    return this.http.get(`${this.uri}/users/getUsers`)
  }

  uploadAvatarImage(image, username){
    return this.http.post(`${this.uri}/users/`+ username + `/uploadAvatarImage`, image)
  }

  addDefaultImage(username, imageUrl){
    const data = {
      username: username,
      imageUrl: imageUrl
    }
    return this.http.post(`${this.uri}/users/addDefaultImage`, data)
  }

  getAllAgencies(){
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }

  searchAgencies(agency, address){
    const data = {
      agency: agency,
      address: address
    }
    return this.http.post(`${this.uri}/agency/searchAgencies`, data)
  }
}
