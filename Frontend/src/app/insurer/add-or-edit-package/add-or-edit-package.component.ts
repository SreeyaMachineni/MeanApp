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
  packge: any;
  action: String;
  categoryName: String;

  constructor(private packageService: PackageService, 
    private router: Router, 
    private location: Location, 
    private insurerService: InsurerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = this.packageService.getAction();
    this.packge = new Package();
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
      this.packge = this.packageService.getPackage();
      this.packageForm = new FormGroup({
        name: new FormControl(this.packge.name),
        insCategory: new FormControl(this.packge.insCategory),
        maxSumAssured: new FormControl(this.packge.maxSumAssured),
        minSumAssured: new FormControl(this.packge.minSumAssured),
        premiumAmnt: new FormControl(this.packge.premiumAmnt),
        maxNoOfMembersCovered: new FormControl(this.packge.maxNoOfMembersCovered),
        maxMaturity: new FormControl(this.packge.maxMaturity),
        networkHospitals: new FormControl(this.packge.networkHospitals),
        diseaseCoverageWaitingPeriod: new FormControl(this.packge.diseaseCoverageWaitingPeriod),
        waitingPeriod: new FormControl(this.packge.waitingPeriod),
        requiredDocs: new FormControl(this.packge.requiredDocs),
        diseasesCovered: new FormControl(this.packge.diseasesCovered),
        diseasesUnCovered: new FormControl(this.packge.diseasesUnCovered)
      });
    }
  }

  saveit(packageId) {
    var requiredDocs = [];
    var diseasesCovered = [];
    var diseasesUncovered = [];
    if (this.packageForm.value.requiredDocs.includes(',')) {
      requiredDocs = this.packageForm.value.requiredDocs.split(',');
    } else {
      requiredDocs.push(this.packageForm.value.requiredDocs);
    }

    if (this.packageForm.value.diseasesCovered.includes(',')) {
      diseasesCovered = this.packageForm.value.diseasesCovered.split(',');
    } else {
      diseasesCovered.push(this.packageForm.value.diseasesCovered);
    }

    if (this.packageForm.value.diseasesUnCovered.includes(',')) {
      diseasesUncovered = this.packageForm.value.diseasesUnCovered.split(',');
    } else {
      diseasesUncovered.push(this.packageForm.value.diseasesUnCovered);
    }

    this.packge.name = this.packageForm.value.name;
    this.packge.insProvider = this.insurers.name;
    this.packge.insProviderId = this.insurers._id;
    this.packge.insCategory = this.categoryName;
    this.packge.insCategoryId = this.packageForm.value.insCategory
    this.packge.maxSumAssured = this.packageForm.value.maxSumAssured;
    this.packge.minSumAssured = this.packageForm.value.minSumAssured;
    this.packge.premiumAmnt = this.packageForm.value.premiumAmnt;
    this.packge.maxNoOfMembersCovered = this.packageForm.value.maxNoOfMembersCovered;
    this.packge.maxMaturity = this.packageForm.value.maxMaturity;
    this.packge.networkHospitals = this.packageForm.value.networkHospitals;
    this.packge.diseaseCoverageWaitingPeriod = this.packageForm.value.diseaseCoverageWaitingPeriod;
    this.packge.waitingPeriod = this.packageForm.value.waitingPeriod;
    this.packge.requiredDocs = requiredDocs;
    this.packge.diseasesCovered = diseasesCovered;
    this.packge.diseasesUnCovered = diseasesUncovered;
    if (this.action == 'add') {
      this.packageService.addPackage(this.packge).subscribe(
        (data) => {
          this._snackBar.open('Package added successfully', 'x', { duration: 3000 })
          if (data['success']) { this.router.navigate(['/home/insurers']); }
        },
        err => this._snackBar.open('Error while adding Package', 'x', { duration: 3000 })
      )
    }
    else {
      this.packageService.editPackage(packageId, this.packge, true).subscribe(
        (data) => {
          if (data['success']) { 
            this._snackBar.open('Package updated successfully', 'x', { duration: 3000 });
            this.router.navigate(['/home/insurers']); }
        },
        err => this._snackBar.open('Error while updating Package POCs', 'x', { duration: 3000 })
      )
    }
  }

  cancel() {
    this.location.back();
  }

  selectedCategory(categoryName) {
    this.categoryName = categoryName;
  }
}
