import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder,FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Package} from '../package';
import {PackageService} from '../package.service';
@Component({
  selector: 'app-add-or-edit-package',
  templateUrl: './add-or-edit-package.component.html',
  styleUrls: ['./add-or-edit-package.component.css']
})
export class AddOrEditPackageComponent implements OnInit {
  packageForm:FormGroup;
  insurers:any;
  categories:any;
  hospitals:any;
  packge:any;
  action:String;
  constructor(private packageService:PackageService,private router: Router) { }

  ngOnInit() {
    this.action = this.packageService.getAction();
    this.packge = new Package();
    this.packageService.getInsurers().subscribe(
      (insurers)=>{
        this.insurers = insurers
        console.log(insurers);
      }
    );
    this.packageService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;
        console.log(categories);
      }
    );
    this.packageService.getHospitalList().subscribe(
      (hospitals)=>{
        this.hospitals = hospitals;
        console.log(hospitals);
      }
    )
    if(this.action == 'add'){
      this.packageForm = new FormGroup({
        name:new FormControl(''),
        insProvider:new FormControl(''),
        insCategory:new FormControl(''),
        maxSumAssured:new FormControl(''),
        minSumAssured:new FormControl(''),
        premiumAmnt:new FormControl(''),
        maxNoOfMembersCovered:new FormControl(''),
        maxMaturity:new FormControl(''),
        networkHospitals:new FormControl(''),
        diseaseCoverageWaitingPeriod:new FormControl(''),
        waitingPeriod:new FormControl(''),
        requiredDocs:new FormControl('')
      });
    }
    else{
      this.packge = this.packageService.getPackage();
      this.packageForm = new FormGroup({
        name:new FormControl(this.packge.name),
        insProvider:new FormControl(this.packge.insProvider),
        insCategory:new FormControl(this.packge.insCategory),
        maxSumAssured:new FormControl(this.packge.maxSumAssured),
        minSumAssured:new FormControl(this.packge.minSumAssured),
        premiumAmnt:new FormControl(this.packge.premiumAmnt),
        maxNoOfMembersCovered:new FormControl(this.packge.maxNoOfMembersCovered),
        maxMaturity:new FormControl(this.packge.maxMaturity),
        networkHospitals:new FormControl(this.packge.networkHospitals),
        diseaseCoverageWaitingPeriod:new FormControl(this.packge.diseaseCoverageWaitingPeriod),
        waitingPeriod:new FormControl(this.packge.waitingPeriod),
        requiredDocs:new FormControl(this.packge.requiredDocs)
      });
    }

    }
    

  saveit(packageId){
    var requiredDocs = [];    
    requiredDocs = this.packageForm.value.requiredDocs.split(',');
    this.packge.name = this.packageForm.value.name;
    this.packge.insProvider = this.packageForm.value.insProvider;
    this.packge.insCategory = this.packageForm.value.insCategory;
    this.packge.maxSumAssured = this.packageForm.value.maxSumAssured;
    this.packge.minSumAssured = this.packageForm.value.minSumAssured;
    this.packge.premiumAmnt = this.packageForm.value.premiumAmnt;
    this.packge.maxNoOfMembersCovered = this.packageForm.value.maxNoOfMembersCovered;
    this.packge.maxMaturity = this.packageForm.value.maxMaturity;
    this.packge.networkHospitals = this.packageForm.value.networkHospitals;
    this.packge.diseaseCoverageWaitingPeriod = this.packageForm.value.diseaseCoverageWaitingPeriod;
    this.packge.waitingPeriod = this.packageForm.value.waitingPeriod;
    this.packge.requiredDocs = requiredDocs;
    if(this.action == 'add'){
      this.packageService.addPackage(this.packge).subscribe(
        (data)=>{
          if(data['success']){ this.router.navigate(['/home/insurers']); }    
        },
        err=>{console.log(err)}
      )
    }
    else{
      this.packageService.editPackage(packageId,this.packge).subscribe(
        (data)=>{
          if(data['success']){ this.router.navigate(['/home/insurers']); }    
        },
        err=>{console.log(err)}
      )
    }

  }

}
