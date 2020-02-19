import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {Package} from './package';
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  package:Package;
  url = environment.environment.ServerUrl;
action:String;
packageId:any;
constructor(private http: HttpClient) { }

addPackage(packge){
  return this.http.post(this.url+'/package/addPackage',{package:packge},{
    headers:new HttpHeaders(
     { 'Content-Type':'application/json'}
    )
  });
}
fetchPackages(insurerId){
 return this.http.get(this.url+'/package/getpackages/'+insurerId);
}
deletePackage(packageId){
  return this.http.get(this.url+'/package/deletepackage/'+packageId);
}
editPackage(packageId,packge,notify){
  return this.http.post(this.url+'/package/editpackage/'+packageId,{package:packge},{
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
  return this.http.get(this.url+'/insurer/getInsuresList');
}
getCategories(){
  return this.http.get(this.url+'/category/getCategoryList');
}
getHospitalList(){
  return this.http.get(this.url+'/hospital/getHospitalList');
}
}
