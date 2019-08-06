import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserPackage} from '../../user-packages/user-packages';
import {UserPackagesService} from '../../user-packages/user-packages.service';
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
  constructor(private router:Router,private userPackageService:UserPackagesService) { }

  ngOnInit() {
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
      this.getPackages(this.userPackage.insurer);
      this.userPackageForm = new FormGroup({  
        insurer:new FormControl(this.userPackage.insurer),
        package:new FormControl(this.userPackage.package),
        category:new FormControl(this.userPackage.category),
        activeFrom:new FormControl(this.userPackage.activeFrom),
        activeTo:new FormControl(this.userPackage.activeTo)
      });
    }
    
  }
  getPackages(insurer){
    this.userPackageService.getPackagesByInsurer(insurer).subscribe(
      (packages)=>{
        this.packages = packages;
      }
    )
  }
  save(packageId?){
    this.userPackage.username = JSON.parse(localStorage.getItem('user')).firstName;
    this.userPackage.category = this.userPackageForm.value.category;
    this.userPackage.insurer = this.userPackageForm.value.insurer;
    this.userPackage.package = this.userPackageForm.value.package;
    this.userPackage.activeFrom = this.userPackageForm.value.activeFrom;
    this.userPackage.activeTo = this.userPackageForm.value.activeTo;
   
    
    if(this.action == 'add'){
      this.userPackage.isAssigned = false;
      this.userPackage.assignedTo = null;
      this.userPackageService.addUserPackage(this.userPackage).subscribe(
        (userPackage)=>{
          this.router.navigate(['/home/mypackages'])
        // this.router.navigate(['/home/viewUserPackage']);
        // this.userPackageService.setUserPackage(this.userPackage);
        },(err)=>{
          console.log('err in adding');
        }
      )
    }else{
      console.log('------------------')
      console.log(this.userPackage);
      this.userPackageService.editUserPackage(packageId,this.userPackage).subscribe(
        (userPackage)=>{
          this.router.navigate(['/home/mypackages'])
        },(err)=>{
          console.log('err in adding');
        }
      )
    }
   
  }

  deleteUserPackage(packageId){
    this.userPackageService.deleteUserPackage(packageId).subscribe(
      (userPackage)=>{
        console.log('up deleted');
      },(err)=>{
        console.log('unable to delete');
      }
    )
  }

}
