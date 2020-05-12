import { Component, OnInit } from '@angular/core';
import { UserClaimsService } from '../user-claims.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserClaims } from '../user-claims';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-or-edit-user-claims',
  templateUrl: './add-or-edit-user-claims.component.html',
  styleUrls: ['./add-or-edit-user-claims.component.css']
})

export class AddOrEditUserClaimsComponent implements OnInit {
  packages: any;
  userClaimsForm: FormGroup;
  packageName: String;
  userClaim: UserClaims;
  action: String;
  diseases: any;
  covered: any;
  packageId:any;

  constructor(private userClaimsService: 
    UserClaimsService, 
    private location: Location,
    private router: Router, 
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userClaim = new UserClaims();
    var userId = JSON.parse(localStorage.getItem('user')).id;
    this.action = this.userClaimsService.getAction();
    this.fetchUserPackages(userId);

    if (this.action == 'Add') {
      this.userClaimsForm = new FormGroup({
        packageName: new FormControl(''),
        hospital: new FormControl(''),
        disease: new FormControl(''),
        location: new FormControl(''),
        dateOfSurgery: new FormControl(''),
        claimedAmount: new FormControl(''),
      });
    }
    else {
      this.userClaim = this.userClaimsService.getClaim();
      this.selectedPackage(this.userClaim.packageId, this.userClaim.packageName);
      this.userClaimsForm = new FormGroup({
        packageName: new FormControl(this.userClaim.packageName),
        hospital: new FormControl(this.userClaim.hospital),
        disease: new FormControl(this.userClaim.disease),
        location: new FormControl(this.userClaim.location),
        dateOfSurgery: new FormControl(this.userClaim.dateOfSurgery),
        claimedAmount: new FormControl(this.userClaim.claimedAmount),
      });
    }
  }

  fetchUserPackages(userId) {
    this.userClaimsService.getUserPackages(userId).subscribe(
      (packages) => {
        this.packages = packages;
      }, (err) => {
        this._snackBar.open('Error while fetching Packages', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    );
  }

  selectedPackage(packageId, packageName) {
    this.packageName = packageName;
    this.packageId = packageId;
    this.fetchCoveredDiseases(packageId);
  }

  cancel() {
    // this.location.back();
    this.router.navigate(['/home/myclaims']);
  }

  fetchCoveredDiseases(packageId) {
    this.userClaimsService.fetchCoveredDiseases(packageId).subscribe(
      (diseases) => {
        this.diseases = diseases;
        this.covered = this.diseases.diseasesCovered;
      }
    )
  }

  save(packageId?) {
    this.userClaim.userId = JSON.parse(localStorage.getItem('user')).id;
    this.userClaim.packageId = this.packageId;
    this.userClaim.hospital = this.userClaimsForm.value.hospital;
    this.userClaim.disease = this.userClaimsForm.value.disease;
    this.userClaim.location = this.userClaimsForm.value.location;
    this.userClaim.dateOfSurgery = this.userClaimsForm.value.dateOfSurgery;
    this.userClaim.packageName = this.userClaimsForm.value.packageName;
    this.userClaim.claimedAmount = this.userClaimsForm.value.claimedAmount;
    if (this.action == 'Add') {
      this.userClaimsService.addUserClaim(this.userClaim).subscribe(
        (userClaim) => {
          this.router.navigate(['/home/myclaims']);
          this._snackBar.open('Claim added successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });

        }, (err) => {
          this._snackBar.open('Error while adding Claim', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      )
    }
    else {
      this.userClaimsService.editUserClaim(this.userClaim).subscribe(
        (userPackage) => {
          this.router.navigate(['/home/myclaims']);
          this._snackBar.open('Claim updated successfully', 'x', { duration: 3000, panelClass: ['snackbar-success']
          });
        }, (err) => {
          this._snackBar.open('Error while updating Claim', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      )
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.packageName === o2.packageName && o1.packageId === o2.packageId;
  }
}
