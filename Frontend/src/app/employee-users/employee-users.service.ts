import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {User} from '../user';
@Injectable({
  providedIn: 'root'
})
export class EmployeeUsersService {
  user:User;
  docId:String;
  uri = 'http://192.168.4.101:3000';
  constructor(private http: HttpClient) { }
  getEmpUsers(empId){
    return this.http.get(this.uri+'/users/getEmpUsers/'+empId);
  }
  setUser(user){
    this.user = user;
  }
  getUser(){
    return this.user;
  }
  getUserPackages(userId){
    return this.http.get(this.uri+'/userPackage/getUserPackages/'+userId);
  }
  getDocs(userId){
    
    return this.http.get(this.uri+'/docs/getDocs/'+userId);
  } 
  setDocId(docId){
    this.docId = docId;
  }
  getDocId(){
    return this.docId;
  }
  approveDoc(docId,docName){
    return this.http.post(this.uri+'/docs/approveDoc',{docId:docId,approve:true,docName:docName},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
  rejectDoc(docId,reason,docName){
    return this.http.post(this.uri+'/docs/rejectDoc',{docId:docId,userId:this.user['_id'],approve:false,reason:reason,docName:docName},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }
  
}
