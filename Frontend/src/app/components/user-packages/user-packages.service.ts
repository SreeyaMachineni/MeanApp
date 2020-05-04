import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {UserPackage} from '../user-packages/user-packages';
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPackagesService {
  url = environment.environment.ServerUrl;
  action:String;
  userPackage:UserPackage;
  constructor(private http: HttpClient) { }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }
  getInsurers(){
    return this.http.get(this.url+'/insurer/getInsuresList');
  }
  getPackagesByInsurer(insurer){
    return this.http.get(this.url+'/package/getPackagesByInsurer/'+insurer);
  }
  getCategories(){
    return this.http.get(this.url+'/category/getCategoryList');
  }
  addUserPackage(userPackage){
    
    return this.http.post(this.url+'/userPackage/addUserPackage',{package:userPackage,notify:JSON.parse(localStorage.getItem('user')).userEmpId,},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  deleteUserPackage(packageId){
    return this.http.get(this.url+'/userPackage/deleteUserPackage/'+packageId);
  }

  editUserPackage(packageId,userPackage){
    return this.http.post(this.url+'/userPackage/editUserPackage/'+packageId,{package:userPackage,notify:JSON.parse(localStorage.getItem('user')).userEmpId,},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  fetchUserPackages(userId){
    return this.http.get(this.url+'/userPackage/getUserPackages/'+userId);
  }
  setUserPackage(packge){
    this.userPackage = packge;
  }
  getUserPackage(){
    return this.userPackage;
  }
  getPackageDetails(packge){
    return this.http.get(this.url+'/package/getPackageDetails/'+packge);
  }
}
