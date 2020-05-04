import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorVisitService {
  action:any;
  doctorVisit:any;
  url = environment.environment.ServerUrl;

constructor(private http: HttpClient) { }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }
  addDoctorVisit(doctorVisit){
    return this.http.post(this.url+'/doctorVisit/addDoctorVisit',{doctorVisit},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchDoctorVisits(userId){
    return this.http.get(this.url+'/doctorVisit/doctorVisits/'+userId);
  }
setVisit(doctorVisit){
  this.doctorVisit = doctorVisit;
}
getVisit(){
  return this.doctorVisit;
}
editDoctorVisit(doctorVisit){
  return this.http.post(this.url+'/doctorVisit/editDoctorVisit',{doctorVisit},{
    headers:new HttpHeaders(
     { 'Content-Type':'application/json'}
    )
  });
}
deleteVisit(visitId){
  return this.http.get(this.url+'/doctorVisit/deleteVisit/'+visitId);
}
}
