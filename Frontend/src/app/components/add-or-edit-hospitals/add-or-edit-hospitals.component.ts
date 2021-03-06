import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Hospital } from '../../hospital';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-or-edit-hospitals',
  templateUrl: './add-or-edit-hospitals.component.html',
  styleUrls: ['./add-or-edit-hospitals.component.css']
})

export class AddOrEditHospitalsComponent implements OnInit {
  hospForm:FormGroup;
  hosp:Hospital;
  action:String;
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private location: Location,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.hosp = new Hospital();
    this.action = this.authService.getAction();
    if(this.action == 'edit'){
      this.hosp = this.authService.getHosp();
      this.hospForm=this.fb.group({
        name:[this.hosp.name,[Validators.required]],
        specialization:[this.hosp.specialization,[Validators.required]],
        location:[this.hosp.location,[Validators.required]],
        address:[this.hosp.address,[Validators.required]],
        pointOfContact:this.fb.array([this.initPoC(this.action)])
      });
      this.loadpocs();
    }
    else{
      this.hospForm=this.fb.group({
        name:['',[Validators.required]],
        specialization:['',[Validators.required]],
        location:['',[Validators.required]],
        address:['',[Validators.required]],
        pointOfContact:this.fb.array([this.initPoC(this.action)])
      });
    }
  }

  initPoC(action){
    if(action == 'add'){
      return this.fb.group({
        name:['',Validators.required],
        phone:['',Validators.required]
      });
    }
    else{
      return this.fb.group({
        name:[this.hosp.pointOfContact[0].name,Validators.required],
        phone:[this.hosp.pointOfContact[0].phone,Validators.required]
      });
    }
  }

  loadpocs(){
    for(let i=1; i<this.hosp.pointOfContact.length; i++){
      const control = <FormArray>this.hospForm.controls['pointOfContact'];
      control.push(
        this.fb.group({
          name:[this.hosp.pointOfContact[i].name,Validators.required],
          phone:[this.hosp.pointOfContact[i].phone,Validators.required]
        })
      );
  }
  }

  addPoC(){
    const control = <FormArray>this.hospForm.controls['pointOfContact'];
    control.push(this.initPoC('add'));
  }

  removePoC(i:number){
    const control = <FormArray>this.hospForm.controls['pointOfContact'];
    control.removeAt(i);
  }

  save(hospForm,hospid?){
    this.hosp.name=this.hospForm.value.name;
    this.hosp.specialization= this.hospForm.value.specialization;
    this.hosp.location=this.hospForm.value.location;
    this.hosp.address=this.hospForm.value.address;
    this.hosp.pointOfContact=this.hospForm.value.pointOfContact;
    if(this.action == 'add'){
        this.authService.addHospital(this.hosp).subscribe(
          (data)=>{
            if(data['success']){ this.router.navigate(['/home/hospitals']);
            this._snackBar.open('Hospital added successfully', 'x', { duration: 3000, panelClass: ['snackbar-error'] });
          }    
          },
          err=>
          this._snackBar.open('Error while adding Hospital', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        )
    }
    else{
        this.authService.editHosp(this.hosp,hospid).subscribe(
          (data)=>{if(data['success']){ this.router.navigate(['/home/hospitals']);
          this._snackBar.open('Hospital updated successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
        }},
          err=>{this._snackBar.open('Error while updating Hospital', 'x', { duration: 3000, panelClass: ['snackbar-error'] })}
        )
    }  
  }

  cancel(){
    this.location.back();
  }

}
