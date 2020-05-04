import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignUsersService {
  url = environment.environment.ServerUrl;
  constructor(private http: HttpClient) { }
  assignUser(userList,emp){  
   
    return this.http.post(this.url+'/users/assign',{userList:userList,emp:emp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
}
