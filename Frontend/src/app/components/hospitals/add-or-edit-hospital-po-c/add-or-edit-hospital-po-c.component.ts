import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
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
  currentHospital: any;

  constructor(private returnLocation: Location, 
    private hospitalPocService: HospitalPocService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = this.hospitalPocService.getAction();
    this.currentHospital = this.hospitalPocService.getHospital();
    this.initForm(this.action);
  }

  initForm(action) {
    if (action == 'Add') {
      this.poc = new HospitalPoc();
      this.pocForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        gender: new FormControl(''),
        address: new FormControl(''),
        hospitalName: new FormControl(this.currentHospital.name),
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
        hospitalName: new FormControl(this.currentHospital.name),
      })
    }
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
    this.poc.hospitalName = this.currentHospital.name;
    this.poc.hospitalId = this.currentHospital._id;
    this.poc.firstName = this.pocForm.value.firstName;
    this.poc.lastName = this.pocForm.value.lastName;
    this.poc.phone = this.pocForm.value.phone;
    this.poc.email = this.pocForm.value.email;
    this.poc.gender = this.pocForm.value.gender;
    this.poc.address = this.pocForm.value.address;
    this.poc.password = 'poc';
    if (this.action == 'Add') {
      this.hospitalPocService.addPoC(this.poc).subscribe(
        (poc) => {
          this.router.navigate(['/home/hospitalDetails']);
          this._snackBar.open('PoC added successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
        }, (err)=>{
          this._snackBar.open('Error while adding PoC', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      )
    } else {
      this.hospitalPocService.editPoc(this.poc, pocId).subscribe(
        (poc) => {
          this.router.navigate(['/home/hospitalDetails']);
          this._snackBar.open('PoC updated successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
        }, (err)=>{
          this._snackBar.open('Error while updating PoC', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      )
    }
  }
}
