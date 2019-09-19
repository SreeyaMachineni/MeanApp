import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
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
    
   });
  }

}
