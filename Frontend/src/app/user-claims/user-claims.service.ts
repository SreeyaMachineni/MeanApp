import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class UserClaimsService {
  uri = 'http://192.168.4.101:3000';
  action:String;
  constructor(private http: HttpClient) { }
  getUserPackages(userId){
    return this.http.get(this.uri+'/userPackage/getUserPackages/'+userId);
  }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }
  addUserClaim(userClaim){
    console.log(userClaim);
    return this.http.post(this.uri+'/userClaims/addUserClaim',{claim:userClaim,notify:JSON.parse(localStorage.getItem('user')).userEmpId,username:JSON.parse(localStorage.getItem('user')).firstName},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  getUserClaims(userId){
    return this.http.get(this.uri+'/userClaims/getUserClaims/'+userId);
  }
  fetchCoveredDiseases(packageId){
    return this.http.get(this.uri+'/package/getCoveredDiseases/'+packageId); 
  }
}
