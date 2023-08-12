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

  register(username, password, email, telephone, type, firstname, lastname, agency, address, agencyID, description, address_string){
    const data = { //dodati address_string
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
      description: description,
      address_string: address_string,
      workers_number: 0
    }
    return this.http.post(`${this.uri}/users/register`, data)
  }

  getUsers(){
    return this.http.get(`${this.uri}/users/getUsers`)
  }

  getUserByUsername(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/getUserByUsername`, data)
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

  getAllClients(){
    return this.http.get(`${this.uri}/users/getAllClients`)
  }

  searchAgencies(agency, address){
    const data = {
      agency: agency,
      address: address
    }
    return this.http.post(`${this.uri}/agency/searchAgencies`, data)
  }

  editClient(client){
    return this.http.post(`${this.uri}/users/editClient`, {client: client})
  }

  editAgency(agency){
    return this.http.post(`${this.uri}/agency/editAgency`, {agency: agency})
  }

  getPendingUsers(){
    return this.http.get(`${this.uri}/users/getPendingUsers`)
  }

  acceptRequest(req){
    return this.http.post(`${this.uri}/users/accept`, {user: req})
  }

  rejectRequest(req){
    return this.http.post(`${this.uri}/users/reject`, {username: req.username})
  }

  deleteUser(username){
    return this.http.post(`${this.uri}/users/deleteUser`, {username: username})
  }

  addUser(username, password, email, telephone, type, firstname, lastname, agency, address, agencyID, description, address_string){
    const data = { //dodati address_string
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
      description: description,
      address_string: address_string,
      workers_number: 0
    }
    return this.http.post(`${this.uri}/users/addUser`, data)
  }

  changePassword(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  comparePasswords(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/comparePasswords`, data)
  }

  reset(email){
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/users/reset`, data)
  }

  changePasswordEmail(email, password){
    const data = {
      username: email,
      password: password
    }
    return this.http.post(`${this.uri}/users/changePasswordEmail`, data)
  }
  
}
