import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {Hospital} from '../hospital';
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalPocService {
action:String;
url = environment.environment.ServerUrl;
hospital:Hospital;
poc:any;
constructor(private http: HttpClient) { }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }
  getHospitals(){
   return  this.http.get(this.url+'/hospital/getHosp');
  }
  addPoC(poc){
    console.log(poc);
    return this.http.post(this.url+'/hospitalPoc/addPoc',{poc:poc},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  setHospital(hosp){
    this.hospital = hosp;
  }
  getHospital(){
    return this.hospital;
  }
  getPocs(hospitalId){
    return this.http.get(this.url+'/hospitalPoc/getPocs/'+hospitalId);
  }
  deletePoc(pocId){
    return this.http.get(this.url+'/hospitalPoc/deletePoc/'+pocId);
  }
  setHospPoc(poc){
this.poc = poc;
  }
  getHospPoc(){
    return this.poc;
  }
  editPoc(poc,pocId){
    
    return this.http.post(this.url+'/hospitalPoc/editPoc',{poc:poc,pocId:pocId},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
}
