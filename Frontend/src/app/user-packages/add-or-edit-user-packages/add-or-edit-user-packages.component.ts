import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserPackage} from '../../user-packages/user-packages';
import {UserPackagesService} from '../../user-packages/user-packages.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-or-edit-user-packages',
  templateUrl: './add-or-edit-user-packages.component.html',
  styleUrls: ['./add-or-edit-user-packages.component.css']
})
export class AddOrEditUserPackagesComponent implements OnInit {
  userPackageForm:FormGroup;
  userPackage:UserPackage;
  action:String;
  insurers:any;
  packages:any;
  categories:any;
  categoryName:String;
  insuranceName:String;
  packageName:String;
  constructor(private router:Router,private userPackageService:UserPackagesService,private location: Location) { }

  ngOnInit() {
    debugger
    this.action = this.userPackageService.getAction();
    this.userPackageService.getInsurers().subscribe(
      (insurers)=>{
        this.insurers = insurers
      }
    );
    this.userPackageService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
      }
    );
    this.userPackage = new UserPackage();
    if(this.action == 'add'){ 
      this.userPackageForm = new FormGroup({  
        insurer:new FormControl(' '),
        package:new FormControl(' '),
        category:new FormControl(' '),
        activeFrom:new FormControl(' '),
        activeTo:new FormControl(' ')
      });
    }else{

      this.userPackage = this.userPackageService.getUserPackage();
      console.log(this.userPackage);
      // this.categoryName = this.userPackage.categoryName;
      // this.insuranceName = this.userPackage.insurerName;
      // this.packageName = this.userPackage.packageName;
      this.selectedInsurance(this.userPackage.insurerId);
      this.userPackageForm = new FormGroup({  
        insurer:new FormControl(this.userPackage.insurerName),
        package:new FormControl(this.userPackage.packageName),
        category:new FormControl(this.userPackage.categoryName),
        activeFrom:new FormControl(this.userPackage.activeFrom),
        activeTo:new FormControl(this.userPackage.activeTo)
      });
      console.log(this.userPackageForm);
    }
    
  }
  
  save(packageId?){
    this.userPackage.userId = JSON.parse(localStorage.getItem('user')).id;
    this.userPackage.username = JSON.parse(localStorage.getItem('user')).firstName;
    this.userPackage.categoryId = this.userPackageForm.value.category;
    this.userPackage.insurerId = this.userPackageForm.value.insurer;
    this.userPackage.packageId = this.userPackageForm.value.package;
    this.userPackage.categoryName = this.categoryName;
    this.userPackage.insurerName = this.insuranceName;
    this.userPackage.packageName = this.packageName;
    this.userPackage.activeFrom = this.userPackageForm.value.activeFrom;
    this.userPackage.activeTo = this.userPackageForm.value.activeTo;
    if(this.action == 'add'){
      this.userPackage.isAssigned = false;
      this.userPackage.assignedTo = null;
      this.userPackageService.addUserPackage(this.userPackage).subscribe(
        (userPackage)=>{
          this.router.navigate(['/home/mypackages'])
    
        },(err)=>{
        }
      )
    }else{
     
      this.userPackageService.editUserPackage(packageId,this.userPackage).subscribe(
        (userPackage)=>{
          this.router.navigate(['/home/mypackages'])
        },(err)=>{
        }
      )
    }
   
  }

  deleteUserPackage(packageId){
    this.userPackageService.deleteUserPackage(packageId).subscribe(
      (userPackage)=>{
      },(err)=>{
      }
    )
  }
  
  selectedInsurance(insId,insName?){
    this.insuranceName=insName;
    this.userPackageService.getPackagesByInsurer(insId).subscribe(
      (packages)=>{
        this.packages = packages;
      }
    )
  }
  selectedPackage(packageName){
    this.packageName=packageName;
  }
  selectedCategory(categoryName){
    this.categoryName = categoryName;
  }
 
  compareThem(o1, o2): boolean{
    return o1.name === o2.name;
  }
  cancel(){
    this.location.back();
  }
  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
}
