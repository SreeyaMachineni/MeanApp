import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  url = environment.environment.ServerUrl;
  constructor(private http: HttpClient) { }
  addContact(contact){
    console.log(contact);
    return this.http.post(this.url+'/notification/addNotification',{contact},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchEmpUsers(empId){
    return this.http.get(this.url+'/users/getEmpUsers/'+empId);
  }
  getMyContacts(userId){
    return this.http.get(this.url+'/notification/getMyContacts/'+userId)
  }
}
