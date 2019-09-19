import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import {Hospital} from '../hospital';
@Injectable({
  providedIn: 'root'
})
export class HospitalPocService {
action:String;
uri = 'http://192.168.4.101:3000';
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
   return  this.http.get(this.uri+'/hospital/getHosp');
  }
  addPoC(poc){
    return this.http.post(this.uri+'/hospitalPoc/addPoc',{poc:poc},{
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
    return this.http.get(this.uri+'/hospitalPoc/getPocs/'+hospitalId);
  }
  deletePoc(pocId){
    return this.http.get(this.uri+'/hospitalPoc/deletePoc/'+pocId);
  }
  setHospPoc(poc){
this.poc = poc;
  }
  getHospPoc(){
    return this.poc;
  }
  editPoc(poc,pocId){
    console.log(poc);
    return this.http.post(this.uri+'/hospitalPoc/editPoc',{poc:poc,pocId:pocId},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
}
