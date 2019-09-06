import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {Package} from './package';
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  package:Package;
  uri = 'http://192.168.4.101:3000';
action:String;
packageId:any;
constructor(private http: HttpClient) { }

addPackage(packge){
  return this.http.post(this.uri+'/package/addPackage',{package:packge},{
    headers:new HttpHeaders(
     { 'Content-Type':'application/json'}
    )
  });
}
fetchPackages(insurerId){
 return this.http.get(this.uri+'/package/getpackages/'+insurerId);
}
deletePackage(packageId){
  return this.http.get(this.uri+'/package/deletepackage/'+packageId);
}
editPackage(packageId,packge,notify){
  return this.http.post(this.uri+'/package/editpackage/'+packageId,{package:packge},{
    headers:new HttpHeaders({'Content-Type':'application/json'})
  });
}

setAction(action){
  this.action=action;
}
getAction(){
  return this.action;
}
setPackage(packge){
  this.package = packge;
}
getPackage(){
  return this.package;
}
getInsurers(){
  return this.http.get(this.uri+'/insurer/getInsuresList');
}
getCategories(){
  return this.http.get(this.uri+'/category/getCategoryList');
}
getHospitalList(){
  return this.http.get(this.uri+'/hospital/getHospitalList');
}
}
