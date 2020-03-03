import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { HospitalPoc } from '../hospital-poc';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { HospitalPocService } from '../hospital-poc.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-or-edit-hospital-po-c',
  templateUrl: './add-or-edit-hospital-po-c.component.html',
  styleUrls: ['./add-or-edit-hospital-po-c.component.css']
})

export class AddOrEditHospitalPoCComponent implements OnInit {
  pocForm: FormGroup;
  poc: HospitalPoc;
  hospitals: any;
  hospitalName: String;
  action: String;

  constructor(private returnLocation: Location, 
    private hospitalPocService: HospitalPocService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    debugger
    this.action = this.hospitalPocService.getAction();
    this.fetchHospitals();
    // this.poc = new HospitalPoc();
    this.pocForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      hospitalName: new FormControl(''),
    })
  }

  fetchHospitals() {
    this.hospitalPocService.getHospitals().subscribe(
      (hospitals) => {
        this.hospitals = hospitals;
        if (this.action == 'Add') {
          this.poc = new HospitalPoc();
          this.pocForm = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            email: new FormControl(''),
            phone: new FormControl(''),
            gender: new FormControl(''),
            address: new FormControl(''),
            hospitalName: new FormControl(''),
          })
        } else {
          this.poc = this.hospitalPocService.getHospPoc();
          this.pocForm = new FormGroup({
            firstName: new FormControl(this.poc.firstName),
            lastName: new FormControl(this.poc.lastName),
            email: new FormControl(this.poc.email),
            phone: new FormControl(this.poc.phone),
            gender: new FormControl(this.poc.gender),
            address: new FormControl(this.poc.address),
            hospitalName: new FormControl(this.poc.hospitalName),
          })
        }
      },
      (err) => {
        this._snackBar.open('Error while fetching Hospitals', 'x', { duration: 3000 })
      }
    )
  }
  cancel() {
    this.returnLocation.back();
  }

  backToHospitals() {
    this.router.navigate(['/home/hospitals']);
  }

  selectedHospital(hospitalName) {
    this.hospitalName = hospitalName;
  }

  saveit(pocId) {
    this.poc.hospitalName = this.hospitalName;
    this.poc.hospitalId = this.pocForm.value.hospitalName;
    this.poc.firstName = this.pocForm.value.firstName;
    this.poc.lastName = this.pocForm.value.lastName;
    this.poc.phone = this.pocForm.value.phone;
    this.poc.email = this.pocForm.value.email;
    this.poc.gender = this.pocForm.value.gender;
    this.poc.address = this.pocForm.value.address;
    this.poc.password = 'poc'
    if (this.action == 'Add') {
      this.hospitalPocService.addPoC(this.poc).subscribe(
        (poc) => {
          this.router.navigate(['/home/hospitals']);
        }
      )
    } else {
      this.hospitalPocService.editPoc(this.poc, pocId).subscribe(
        (poc) => {
          this.returnLocation.back();
        }
      )
    }
  }
}
