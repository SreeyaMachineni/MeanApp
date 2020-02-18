import { Injectable } from '@angular/core';
import {Insurer} from '../insurer/insurer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsurerService {
  insurer:Insurer;
  url = environment.environment.ServerUrl;
action:String;
insurerId:any;

  constructor(private http: HttpClient) { }
  
  addInsurer(insurer){
    console.log(insurer);
    return this.http.post(this.url+'/insurer/addInsurer',{insurer},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchInsurers(){
   return this.http.get(this.url+'/insurer/getInsurers');
  }
  deleteInsurers(insurerId){
    return this.http.get(this.url+'/insurer/deleteInsurer/'+insurerId);
  }
  editInsurer(insurerId,insurer){
    return this.http.post(this.url+'/insurer/editInsurer/'+insurerId,{insurer},{
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
