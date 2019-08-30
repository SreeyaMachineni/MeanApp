import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {UserPackage} from '../user-packages/user-packages';
@Injectable({
  providedIn: 'root'
})
export class UserPackagesService {
  uri = 'http://192.168.4.101:3000';
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
    return this.http.get(this.uri+'/insurer/getInsuresList');
  }
  getPackagesByInsurer(insurer){
    console.log(insurer);
    return this.http.get(this.uri+'/package/getPackagesByInsurer/'+insurer);
  }
  getCategories(){
    return this.http.get(this.uri+'/category/getCategoryList');
  }
  addUserPackage(userPackage){
    console.log(userPackage);
    return this.http.post(this.uri+'/userPackage/addUserPackage',{package:userPackage},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  deleteUserPackage(packageId){
    return this.http.get(this.uri+'/userPackage/deleteUserPackage/'+packageId);
  }

  editUserPackage(packageId,userPackage){
    return this.http.post(this.uri+'/userPackage/editUserPackage/'+packageId,{package:userPackage},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  fetchUserPackages(userId){
    return this.http.get(this.uri+'/userPackage/getUserPackages/'+userId);
  }
  setUserPackage(packge){
    this.userPackage = packge;
  }
  getUserPackage(){
    return this.userPackage;
  }
  getPackageDetails(packge){
    return this.http.get(this.uri+'/package/getPackageDetails/'+packge);
  }
}
