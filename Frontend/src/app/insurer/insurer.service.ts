import { Injectable } from '@angular/core';
import {Insurer} from '../insurer/insurer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class InsurerService {
  insurer:Insurer;
  uri = 'http://localhost:3000';
action:String;
insurerId:any;
  constructor(private http: HttpClient) { }
  
  addInsurer(insurer){
    console.log(insurer);
    return this.http.post(this.uri+'/insurer/addInsurer',{insurer},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchInsurers(){
   return this.http.get(this.uri+'/insurer/getInsurers');
  }
  deleteInsurers(insurerId){
    return this.http.get(this.uri+'/insurer/deleteInsurer/'+insurerId);
  }
  editInsurer(insurerId,insurer){
    return this.http.post(this.uri+'/insurer/editInsurer/'+insurerId,{insurer},{
      headers:new HttpHeaders({'Content-Type':'application/json'})
    });
  }

  setAction(action){
    this.action=action;
  }
  getAction(){
    return this.action;
  }
  setInsurer(insurer){
    this.insurer = insurer;
  }
  getInsurer(){
    return this.insurer;
  }


}
