import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorVisitService {
  action:any;
  constructor() { }
  setAction(action){
    this.action = action;
  }
  getAction(){
    return this.action;
  }

}
