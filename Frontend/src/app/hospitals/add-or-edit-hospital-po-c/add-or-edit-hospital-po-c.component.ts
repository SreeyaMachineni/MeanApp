import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {HospitalPoc} from '../hospital-poc';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import {HospitalPocService} from '../hospital-poc.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-add-or-edit-hospital-po-c',
  templateUrl: './add-or-edit-hospital-po-c.component.html',
  styleUrls: ['./add-or-edit-hospital-po-c.component.css']
})
export class AddOrEditHospitalPoCComponent implements OnInit {
  pocForm:FormGroup;
  poc:HospitalPoc;
  hospitals:any;
  hospitalName:String;
  constructor(private location:Location,private hospitalPocService:HospitalPocService,private router:Router) { }

  ngOnInit() {
    this.fetchHospitals();
    this.poc = new HospitalPoc();
    this.pocForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      gender:new FormControl(''),
      address:new FormControl(''),
      hospitalName:new FormControl(''),
      location:new FormControl('')
    })
  }
  fetchHospitals(){
    this.hospitalPocService.getHospitals().subscribe(
      (hospitals)=>{
        this.hospitals = hospitals;
        this.pocForm = new FormGroup({
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          gender:new FormControl(''),
          address:new FormControl(''),
          hospitalName:new FormControl(''),
          location:new FormControl('')
        })
        console.log(this.hospitals);
      },
      (err)=>{
        console.log('err in fetching')
      }
    )
  }
  cancel(){
    this.location.back();
  }
  selectedHospital(hospitalName){
    this.hospitalName = hospitalName;
  }
  saveit(){   
    this.poc.hospitalName = this.hospitalName;
    this.poc.location = this.pocForm.value.location;
    this.poc.hospitalId = this.pocForm.value.hospitalName;
    this.poc.firstName = this.pocForm.value.firstName;
    this.poc.lastName = this.pocForm.value.lastName;
    this.poc.phone = this.pocForm.value.phone;
    this.poc.email = this.pocForm.value.email;
    this.poc.gender = this.pocForm.value.gender;
    this.poc.address = this.pocForm.value.address;
    this.poc.password = 'poc'
    this.hospitalPocService.addPoC(this.poc).subscribe(
      (poc)=>{
        this.router.navigate(['/home/hospitalPoc']);
      }
    )
    
  }
}
