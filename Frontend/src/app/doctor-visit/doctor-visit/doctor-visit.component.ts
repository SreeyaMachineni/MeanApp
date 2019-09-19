import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-doctor-visit',
  templateUrl: './doctor-visit.component.html',
  styleUrls: ['./doctor-visit.component.css']
})
export class DoctorVisitComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  addDoctorVisit(){
  this.router.navigate(['/home/addOrEditDoctorVisit'])
  }

}
