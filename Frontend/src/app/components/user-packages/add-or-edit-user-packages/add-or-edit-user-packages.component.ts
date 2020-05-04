import { Component, OnInit, NgModule  } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserPackage } from '../../user-packages/user-packages';
import { UserPackagesService } from '../../user-packages/user-packages.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-or-edit-user-packages',
  templateUrl: './add-or-edit-user-packages.component.html',
  styleUrls: ['./add-or-edit-user-packages.component.css'],
})

export class AddOrEditUserPackagesComponent implements OnInit {
  userPackageForm: FormGroup;
  userPackage: UserPackage;
  action: String;
  insurers: any;
  packages: any;
  selectedPackageDetails: any;
  categories: any;
  categoryId: String;
  insuranceId: String;
  packageId: String;

  constructor(private router: Router, 
    private userPackageService: UserPackagesService, 
    private location: Location, 
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.action = this.userPackageService.getAction();
    this.userPackageService.getInsurers().subscribe(
      (insurers) => {
        this.insurers = insurers
      }
    );
    this.userPackageService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
    this.userPackage = new UserPackage();
    if (this.action == 'add') {
      this.userPackageForm = new FormGroup({
        insurer: new FormControl(' '),
        package: new FormControl(' '),
        category: new FormControl(' '),
        activeFrom: new FormControl(' '),
        activeTo: new FormControl(' ')
      });
    } else {
      this.userPackage = this.userPackageService.getUserPackage();
      this.selectedInsurance(this.userPackage.insurerId);
      this.selectedCategory(this.userPackage.categoryId);
      this.selectedPackage(this.userPackage.packageId);
      this.userPackageForm = new FormGroup({
        insurer: new FormControl(this.userPackage.insurerName),
        package: new FormControl(this.userPackage.packageName),
        category: new FormControl(this.userPackage.categoryName),
        activeFrom: new FormControl(this.userPackage.activeFrom),
        activeTo: new FormControl(this.userPackage.activeTo)
      });
    }
  }

  save(packageId?) {
    this.userPackage.userId = JSON.parse(localStorage.getItem('user')).id;
    this.userPackage.username = JSON.parse(localStorage.getItem('user')).firstName;
    this.userPackage.categoryId = this.categoryId;
    this.userPackage.insurerId = this.insuranceId;
    this.userPackage.packageId = this.packageId;
    this.userPackage.categoryName = this.userPackageForm.value.category;
    this.userPackage.insurerName = this.userPackageForm.value.insurer;
    this.userPackage.packageName = this.userPackageForm.value.package;
    this.userPackage.activeFrom = this.userPackageForm.value.activeFrom;
    this.userPackage.activeTo = this.userPackageForm.value.activeTo;
    if (this.action == 'add') {
      this.userPackage.isAssigned = false;
      this.userPackage.assignedTo = null;
      this.userPackageService.addUserPackage(this.userPackage).subscribe(
        (userPackage) => {
          this.router.navigate(['/home/mypackages']);
          this._snackBar.open('Package added successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
        }, (err) => {
          this._snackBar.open('Error while adding Package', 'x', { duration: 3000, panelClass: ['snackbar-error'] });
        }
      )
    } else {
      this.userPackageService.editUserPackage(packageId, this.userPackage).subscribe(
        (userPackage) => {
          this.router.navigate(['/home/mypackages']);
          this._snackBar.open('Package updated successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
        }, (err) => {
          this._snackBar.open('Error while adding Package', 'x', { duration: 3000, panelClass: ['snackbar-error'] });
        }
      )
    }

  }

  deleteUserPackage(packageId) {
    this.userPackageService.deleteUserPackage(packageId).subscribe(
      (userPackage) => {
        this._snackBar.open('Package deleted successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
      }, (err) => {
        this._snackBar.open('Error while deleting Package', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  selectedInsurance(insId, insName?) {
    this.insuranceId = insId;
    this.userPackageService.getPackagesByInsurer(insId).subscribe(
      (packages) => {
        this.packages = packages;
      }
    )
  }

  selectedPackage(selectedPackage) {
    this.selectedPackageDetails = selectedPackage;
    this.packageId = selectedPackage.packageId;
  }

  selectedCategory(categoryId) {
    this.categoryId = categoryId;
  }

  compareThem(o1, o2): boolean {
    return o1.name === o2.name;
  }

  cancel() {
    // this.location.back();
    this.router.navigate(['/home/mypackages']);
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
}
