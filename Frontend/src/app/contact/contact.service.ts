import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  uri = 'http://192.168.4.101:3000';
  constructor(private http: HttpClient) { }
  addContact(contact){
    return this.http.post(this.uri+'/notification/addNotification',{contact},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchEmpUsers(empId){
    return this.http.get(this.uri+'/users/getEmpUsers/'+empId);
  }
  getMyContacts(userId){
    return this.http.get(this.uri+'/notification/getMyContacts/'+userId)
  }
}
