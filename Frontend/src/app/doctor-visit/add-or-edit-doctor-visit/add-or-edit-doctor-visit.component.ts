import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import {DoctorVisit} from '../doctor-visit';
import {DoctorVisitService} from '../doctor-visit.service';
@Component({
  selector: 'app-add-or-edit-doctor-visit',
  templateUrl: './add-or-edit-doctor-visit.component.html',
  styleUrls: ['./add-or-edit-doctor-visit.component.css']
})
export class AddOrEditDoctorVisitComponent implements OnInit {
  doctorVisitForm:FormGroup;
  doctorVisit:DoctorVisit;
  action:String;
  constructor(private router:Router,private location:Location,private doctorVisitService:DoctorVisitService) { }

  ngOnInit() {
   // this.action = this.doctorVisitService.getAction();
   this.doctorVisitForm=new FormGroup({
    hospitalName:new FormControl(''),
    purpose:new FormControl(''),
    dataOfVisit:new FormControl('')
   });
  }
  cancel(){
    this.location.back();
  }
  save(){
    console.log(this.doctorVisitForm.value);
    this.doctorVisit.userId = JSON.parse(localStorage.getItem('user')).id;
    this.doctorVisit.hospital = this.doctorVisitForm.value.hospitalName;
    this.doctorVisit.purpose = this.doctorVisitForm.value.purpose;
    this.doctorVisit.dataOfVisit = this.doctorVisitForm.value.dataOfVisit
    // this.doctorVisitService.addDoctorVisit(this.doctorVisit).subscribe(
    //   (doctorVisit)=>{console.log(doctorVisit)},
    //   (err)=>{console.log(err);}
    // )
  }

}
