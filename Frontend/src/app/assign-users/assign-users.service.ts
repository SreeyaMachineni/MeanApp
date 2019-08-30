import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AssignUsersService {
  uri = 'http://192.168.4.101:3000';
  constructor(private http: HttpClient) { }
  assignUser(userList,emp){  
   
    return this.http.post(this.uri+'/users/assign',{userList:userList,emp:emp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
}
