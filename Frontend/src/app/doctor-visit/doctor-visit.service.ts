import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class DoctorVisitService {
  action:any;
  doctorVisit:any;
uri = 'http://192.168.4.101:3000';
constructor(private http: HttpClient) { }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }
  addDoctorVisit(doctorVisit){
    return this.http.post(this.uri+'/doctorVisit/addDoctorVisit',{doctorVisit},{
      headers:new HttpHeaders(
       { 'Content-Type':'application/json'}
      )
    });
  }
  fetchDoctorVisits(userId){
    return this.http.get(this.uri+'/doctorVisit/doctorVisits/'+userId);
  }
setVisit(doctorVisit){
  this.doctorVisit = doctorVisit;
}
getVisit(){
  return this.doctorVisit;
}
editDoctorVisit(doctorVisit){
  return this.http.post(this.uri+'/doctorVisit/editDoctorVisit',{doctorVisit},{
    headers:new HttpHeaders(
     { 'Content-Type':'application/json'}
    )
  });
}
deleteVisit(visitId){
  return this.http.get(this.uri+'/doctorVisit/deleteVisit/'+visitId);
}
}
