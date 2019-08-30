import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User} from './user';
import { Hospital } from './hospital';
// import {tokenNotExpired} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uri = 'http://192.168.4.101:3000';
  authToken:any;
  user:any;
  hosp:Hospital;
  action:String
  constructor(private http: HttpClient) { }

  createUser(otp:String):Observable<User>{  
    console.log('calling authors from service');
    console.log(this.user);
    return this.http.post<User>(this.uri+'/users/register',{user:this.user,otp:otp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }

  authenticateUser(user:User):Observable<User>{
    console.log('in auth ser');
    return this.http.post<User>(this.uri+'/users/authenticate',user,{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
  
  getProfile(){
  
    this.loadToken();
    // headers.append('Content-Type','application/json');
    
    const headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(this.uri+'/users/profile',{headers:headers});
  }

  loggedIn(){
   // return tokenNotExpired();
   var expDate = Date.parse(localStorage.getItem('expiresin'));
   console.log(expDate);
   console.log(Date.now());
   var isg = expDate > Date.now();
   console.log('in logged in');
   console.log(isg);
   if(expDate > Date.now()){
     return true;
   }
   return false;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log(this.authToken);
  }

  // storeUserData(token,user){
    storeUserData(token,user,expiresin){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    console.log('-------------');
    console.log(JSON.parse(localStorage.getItem('user')));
    console.log('-------------');


    this.authToken = token;
    this.user=user;
    
    var curTime = Date.now();
    curTime += expiresin;
    console.log(curTime);
    console.log(new Date(curTime));
    localStorage.setItem('expiresin',JSON.stringify(new Date(curTime)));
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

sendOtp(user:User){
//  console.log(otp);
  console.log('otp');
  this.user=user;
  return this.http.post(this.uri+'/users/sendotp',{phone:this.user.phone},{
    headers:new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  });
}
getUser(){
  return this.user;
}

fileUpload(fd):Observable<any>{
  console.log(fd);
  console.log('in auht service');
return this.http.post(this.uri+'/users/test',{image:fd},{headers:new HttpHeaders({'Content-Type':'application/json'})});
}

uploadImg():Observable<any>{
return this.http.get(this.uri+'/users/uploadtest');
}
getMenus(userRole){
  console.log('getting menus '+userRole);
  return this.http.get(this.uri+'/users/menus/'+userRole);
}
addEmp(emp:User){
    console.log(emp);
    console.log('otp');
    this.user=emp;
    return this.http.post(this.uri+'/users/addEmp',{emp:this.user},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
  getEmployees(userrole){
    return this.http.get(this.uri+'/users/getEmp/'+userrole);
  }
  deleteEmp(empid){
    return this.http.get(this.uri+'/users/deleteEmp/'+empid);
  }
  setAction(action){
    this.action=action;
  }
  getAction(){
    return this.action;
  }
  setUser(user:User){
    this.user = user;
  }
  editEmp(emp:User,empId){
    return this.http.post(this.uri+'/users/editEmp/'+empId,{emp:emp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
  addHospital(hosp:Hospital){
    return this.http.post(this.uri+'/hospital/addHosp',{hosp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }

  getHospitals(){
    return this.http.get(this.uri+'/hospital/getHosp');
  }
  deleteHosp(hospid){
    return this.http.get(this.uri+'/hospital/deleteHosp/'+hospid);
  }
  setHosp(hosp:Hospital){
    this.hosp = hosp;
  }
  getHosp(){
    return this.hosp;
  }
  editHosp(hosp,hospid){
    return this.http.post(this.uri+'/hospital/editHosp/'+hospid,{hosp:hosp},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }
  getNumOfUsersToAssign(){
    return this.http.get(this.uri+'/users/getNumOfUsersToAssign');
  }

  getUsers(){
    return this.http.get(this.uri+'/users/getUsers');
  }

  getUnassignedUsers(){
    return this.http.get(this.uri+'/users/getUnassignedUsers');
  }

  getNumOfPkgsToVisit(assignedTo){
    return this.http.get(this.uri+'/userPackage/getNumOfPackagesToVisit/'+assignedTo);
  }
 
  getDocs(id){
    console.log(id);
    return this.http.get(this.uri+'/docs/getDocs/'+id);
  } 
  getNotifications(userId){
    return this.http.get(this.uri+'/notification/getNotifications/'+userId);
  }

}
