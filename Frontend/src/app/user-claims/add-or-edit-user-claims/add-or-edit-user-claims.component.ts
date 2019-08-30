import { Component, OnInit } from '@angular/core';
import {UserClaimsService} from '../user-claims.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserClaims } from '../user-claims';
@Component({
  selector: 'app-add-or-edit-user-claims',
  templateUrl: './add-or-edit-user-claims.component.html',
  styleUrls: ['./add-or-edit-user-claims.component.css']
})



export class AddOrEditUserClaimsComponent implements OnInit {
  packages:any;
  userClaimsForm:FormGroup;
  packageName:String;
  userClaim:UserClaims;
  action:String;
  diseases:any;
  covered:any;
  constructor(private userClaimsService:UserClaimsService,private location: Location,private router:Router,) { }

  ngOnInit() {
    this.userClaim = new UserClaims();
    var userId =JSON.parse(localStorage.getItem('user')).id;
    this.action = this.userClaimsService.getAction();
    this.fetchUserPackages(userId);
    this.userClaimsForm = new FormGroup({  
      package:new FormControl(''),
      hospital:new FormControl(''),
      disease:new FormControl(''),
      location:new FormControl(''),
      dateOfSurgery:new FormControl(''),
    });
  }

  fetchUserPackages(userId){
    this.userClaimsService.getUserPackages(userId).subscribe(
      (packages)=>{
        this.packages = packages;
        console.log(this.packages);
      },(err)=>{
        console.log('err in fetching packages');
      }
    );
  }
  selectedPackage(packageId,packageName){
    this.packageName=packageName;
    this.fetchCoveredDiseases(packageId);
  }
  cancel(){
    this.location.back();
  }
  fetchCoveredDiseases(packageId){
    this.userClaimsService.fetchCoveredDiseases(packageId).subscribe(
      (diseases)=>{
        this.diseases = diseases;
      //  this.diseases = this.diseases[0].diseasesCovered;
      this.covered =this.diseases[0].diseasesCovered; 
      }
    )
  }

  save(packageId?){
    this.userClaim.userId = JSON.parse(localStorage.getItem('user')).id;
    
    
    this.userClaim.packageId = this.userClaimsForm.value.package;
    this.userClaim.hospital = this.userClaimsForm.value.hospital;
    this.userClaim.disease = this.userClaimsForm.value.disease;
    this.userClaim.location = this.userClaimsForm.value.location;
    this.userClaim.dateOfSurgery = this.userClaimsForm.value.dateOfSurgery;
    this.userClaim.packageName = this.packageName;
   
    
    if(this.action == 'Add'){
      
      this.userClaimsService.addUserClaim(this.userClaim).subscribe(
        (userClaim)=>{
          this.router.navigate(['/home/myclaims'])
    
        },(err)=>{
          console.log('err in adding');
        }
      )
    }
    // else{
     
    //   this.userClaimsService.editUserPackage(packageId,this.userPackage).subscribe(
    //     (userPackage)=>{
    //       this.router.navigate(['/home/mypackages'])
    //     },(err)=>{
    //       console.log('err in adding');
    //     }
    //   )
    // }
   
  }
}
