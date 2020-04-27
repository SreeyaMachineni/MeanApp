import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Package } from '../package';
import { PackageService } from '../package.service';
import { Location } from '@angular/common';
import { InsurerService } from '../insurer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-or-edit-package',
  templateUrl: './add-or-edit-package.component.html',
  styleUrls: ['./add-or-edit-package.component.css']
})

export class AddOrEditPackageComponent implements OnInit {
  packageForm: FormGroup;
  insurers: any;
  categories: any;
  hospitals: any;
  package: any;
  action: String;
  categoryId: String;

  constructor(private packageService: PackageService, 
    private router: Router, 
    private location: Location, 
    private insurerService: InsurerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = this.packageService.getAction();
    this.package = new Package();
    this.insurers = this.insurerService.getInsurer();
    this.packageService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
    this.packageService.getHospitalList().subscribe(
      (hospitals) => {
        this.hospitals = hospitals;
      }
    )
    if (this.action == 'add') {
      this.packageForm = new FormGroup({
        name: new FormControl(''),
        //insProvider:new FormControl(''),
        insCategory: new FormControl(''),
        maxSumAssured: new FormControl(''),
        minSumAssured: new FormControl(''),
        premiumAmnt: new FormControl(''),
        maxNoOfMembersCovered: new FormControl(''),
        maxMaturity: new FormControl(''),
        networkHospitals: new FormControl(''),
        diseaseCoverageWaitingPeriod: new FormControl(''),
        waitingPeriod: new FormControl(''),
        requiredDocs: new FormControl(''),
        diseasesCovered: new FormControl(''),
        diseasesUnCovered: new FormControl('')

      });
    }
    else {
      this.package = this.packageService.getPackage();
      console.log('Package form ' + this.package.insCategory);
      this.packageForm = new FormGroup({
        name: new FormControl(this.package.name),
        insCategory: new FormControl(this.package.insCategory),
        maxSumAssured: new FormControl(this.package.maxSumAssured),
        minSumAssured: new FormControl(this.package.minSumAssured),
        premiumAmnt: new FormControl(this.package.premiumAmnt),
        maxNoOfMembersCovered: new FormControl(this.package.maxNoOfMembersCovered),
        maxMaturity: new FormControl(this.package.maxMaturity),
        networkHospitals: new FormControl(this.package.networkHospitals),
        diseaseCoverageWaitingPeriod: new FormControl(this.package.diseaseCoverageWaitingPeriod),
        waitingPeriod: new FormControl(this.package.waitingPeriod),
        requiredDocs: new FormControl(this.package.requiredDocs),
        diseasesCovered: new FormControl(this.package.diseasesCovered),
        diseasesUnCovered: new FormControl(this.package.diseasesUnCovered)
      });
      this.categoryId = this.package.insCategoryId;  
    }
    
  }

  saveit(packageId) {
    debugger
    var requiredDocs = [];
    var diseasesCovered = [];
    var diseasesUncovered = [];
    if (this.packageForm.value.requiredDocs.includes(',')) {
      requiredDocs = this.packageForm.value.requiredDocs.toString().split(',');
    } else {
      requiredDocs.push(this.packageForm.value.requiredDocs.toString());
    }
    if (this.packageForm.value.diseasesCovered.includes(',')) {
      diseasesCovered = this.packageForm.value.diseasesCovered.toString().split(',');
    } else {
      diseasesCovered.push(this.packageForm.value.diseasesCovered.toString());
    }

    if (this.packageForm.value.diseasesUnCovered.includes(',')) {
      diseasesUncovered = this.packageForm.value.diseasesUnCovered.toString().split(',');
    } else {
      diseasesUncovered.push(this.packageForm.value.diseasesUnCovered.toString());
    }

    this.package.name = this.packageForm.value.name;
    this.package.insProvider = this.insurers.name;
    this.package.insProviderId = this.insurers._id;
    this.package.insCategory = this.packageForm.value.insCategory;
    this.package.insCategoryId = this.categoryId;
    this.package.maxSumAssured = this.packageForm.value.maxSumAssured;
    this.package.minSumAssured = this.packageForm.value.minSumAssured;
    this.package.premiumAmnt = this.packageForm.value.premiumAmnt;
    this.package.maxNoOfMembersCovered = this.packageForm.value.maxNoOfMembersCovered;
    this.package.maxMaturity = this.packageForm.value.maxMaturity;
    this.package.networkHospitals = this.packageForm.value.networkHospitals;
    this.package.diseaseCoverageWaitingPeriod = this.packageForm.value.diseaseCoverageWaitingPeriod;
    this.package.waitingPeriod = this.packageForm.value.waitingPeriod;
    this.package.requiredDocs = requiredDocs;
    this.package.diseasesCovered = diseasesCovered;
    this.package.diseasesUnCovered = diseasesUncovered;
    if (this.action == 'add') {
      this.packageService.addPackage(this.package).subscribe(
        (data) => {
          this._snackBar.open('Package added successfully', 'x', { duration: 3000 })
          if (data['success']) { this.router.navigate(['/home/packages']); }
        },
        err => this._snackBar.open('Error while adding Package', 'x', { duration: 3000 })
      )
    }
    else {
      this.packageService.editPackage(packageId, this.package, true).subscribe(
        (data) => {
          if (data['success']) { 
            this._snackBar.open('Package updated successfully', 'x', { duration: 3000 });
            this.router.navigate(['/home/packages']); }
        },
        err => this._snackBar.open('Error while updating Package POCs', 'x', { duration: 3000 })
      )
    }
  }

  cancel() {
    this.location.back();
  }

  backToInsurers() {
    this.router.navigate(['/home/insurers']); 
  }

  selectedCategory(categoryId) {
    this.categoryId = categoryId;
  }
}
