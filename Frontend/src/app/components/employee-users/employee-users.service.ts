import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';
import { User } from 'src/app/user';

@Injectable({
  providedIn: 'root'
})

export class EmployeeUsersService {
  user:User;
  docId:String;
  url = environment.environment.ServerUrl;
  constructor(private http: HttpClient) { }
  getEmpUsers(empId){
    return this.http.get(this.url+'/users/getEmpUsers/'+empId);
  }
  setUser(user){
    this.user = user;
  }
  getUser(){
    return this.user;
  }
  getUserPackages(userId){
    return this.http.get(this.url+'/userPackage/getUserPackages/'+userId);
  }
  getDocs(userId){
    
    return this.http.get(this.url+'/docs/getDocs/'+userId);
  } 
  setDocId(docId){
    this.docId = docId;
  }
  getDocId(){
    return this.docId;
  }
  approveDoc(docId,docName){
    return this.http.post(this.url+'/docs/approveDoc',{docId:docId,approve:true,docName:docName},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
  rejectDoc(docId,reason,docName){
    return this.http.post(this.url+'/docs/rejectDoc',{docId:docId,userId:this.user['_id'],approve:false,reason:reason,docName:docName},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
  getUserClaims(userId){
    return this.http.get(this.url+'/userClaims/getUserClaims/'+userId);
  }
  setStatus(status,claimId){
    return this.http.post(this.url+'/userClaims/setStatus',{status:status,claimId:claimId},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
}
