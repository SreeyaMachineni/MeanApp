import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {UserClaims} from './user-claims';
@Injectable({
  providedIn: 'root'
})
export class UserClaimsService {
  uri = 'http://192.168.195.52:3000';
  action:String;
  userClaim:UserClaims;
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
  setClaim(userclaim){
    this.userClaim = userclaim;
  }
  getClaim(){
    return this.userClaim;
  }
  addUserClaim(userClaim){
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
  deleteUserClaim(claimId){
    return this.http.get(this.uri+'/userClaims/deleteUserClaim/'+claimId);
  }
  editUserClaim(userClaim){
    return this.http.post(this.uri+'/userClaims/editUserClaim',{claim:userClaim,notify:JSON.parse(localStorage.getItem('user')).userEmpId,username:JSON.parse(localStorage.getItem('user')).firstName},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  getEmployeeClaims(empId){
    return this.http.get(this.uri+'/userClaims/getEmpClaims/'+empId);
  }
  getClaimsByHospital(pocId){
    return this.http.get(this.uri+'/userClaims/getClaimsByHospital/'+pocId);
  }
  
}
