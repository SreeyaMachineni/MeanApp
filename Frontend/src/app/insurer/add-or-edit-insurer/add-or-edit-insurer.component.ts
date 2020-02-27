import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Insurer} from '../insurer';
import {InsurerService} from '../insurer.service';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-or-edit-insurer',
  templateUrl: './add-or-edit-insurer.component.html',
  styleUrls: ['./add-or-edit-insurer.component.css']
})
export class AddOrEditInsurerComponent implements OnInit {
  insurerForm:FormGroup;
  insurer:any;
  action:String;
  constructor(private fb:FormBuilder,private router:Router,
    private insurerService:InsurerService,private location: Location,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.insurer = new Insurer();
    this.action = this.insurerService.getAction();
    
    if(this.action == 'edit'){
      this.insurer = this.insurerService.getInsurer();
      
      this.insurerForm=this.fb.group({
        name:[this.insurer.name,[Validators.required]],
        location:[this.insurer.location,[Validators.required]],
        address:[this.insurer.address,[Validators.required]],
        pointOfContact:this.fb.array([this.initPoC(this.action)])
      });
      this.loadpocs();
    }
    else{
      this.insurerForm=this.fb.group({
        name:['',[Validators.required]],
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
        name:[this.insurer.pointOfContact[0].name,Validators.required],
        phone:[this.insurer.pointOfContact[0].phone,Validators.required]
      });
    }
    
  }
  loadpocs(){
    for(let i=1; i<this.insurer.pointOfContact.length; i++){
      const control = <FormArray>this.insurerForm.controls['pointOfContact'];
      control.push(
        this.fb.group({
          name:[this.insurer.pointOfContact[i].name,Validators.required],
          phone:[this.insurer.pointOfContact[i].phone,Validators.required]
        })
      );
  }
  }
  addPoC(){
    const control = <FormArray>this.insurerForm.controls['pointOfContact'];
    control.push(this.initPoC('add'));
  }
  removePoC(i:number){
    const control = <FormArray>this.insurerForm.controls['pointOfContact'];
    control.removeAt(i);
  }
  save(insurerForm,insurerid?){
    this.insurer.name=this.insurerForm.value.name;
    this.insurer.location=this.insurerForm.value.location;
    this.insurer.address=this.insurerForm.value.address;
    this.insurer.pointOfContact=this.insurerForm.value.pointOfContact;
    if(this.action == 'add'){
        this.insurerService.addInsurer(this.insurer).subscribe(
          (data)=>{
            if(data['success']){ this.router.navigate(['/home/insurers']);
            this._snackBar.open('Insurer added successfully', 'x', { duration: 3000,panelClass: ['mat-toolbar', 'mat-primary'] });
          }    
          },
          err=>this._snackBar.open('Error while adding Insurer', 'x', { duration: 3000 })
        )
    }else{
      this.insurerService.editInsurer(insurerid,this.insurer).subscribe(
        (data)=>{if(data['success']){ this.router.navigate(['/home/insurers']);
        this._snackBar.open('Insurer updated successfully', 'x', { duration: 3000,panelClass: ['mat-toolbar', 'mat-primary'] });
      }},
        err=>this._snackBar.open('Error while updating Insurer', 'x', { duration: 3000 })
      )


    }
    
  }
  cancel(){
    this.location.back();
  }


}
