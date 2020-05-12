import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeUsersService } from '../employee-users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { UserClaims } from '../../user-claims/user-claims';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPackage } from 'src/app/components/user-packages/user-packages';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  claimDetails: any;
  currentDate:any;
  userPackage: any;
  userClaims: any;
  docs: any;
  showFilter: boolean = true;
  statusForm: FormGroup;
  userdocsApprove: FormGroup;
  userdocsReject: FormGroup;
  displayedColumns: string[] = ['categoryName', 'insurerName', 'packageName', 'activeFrom', 'activeTo', 'status'];
  claimColumns: string[] = ['packageName', 'hospital', 'location', 'dateOfSurgery', 'disease'];
  dataSourceForClaims: MatTableDataSource<UserClaims>;
  dataSourceForPackages: MatTableDataSource<UserPackage>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private empUserService: EmployeeUsersService, 
    private router: Router, 
    private location: Location,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.user = this.empUserService.getUser();
    this.getUserPackages(this.user._id);
    this.getUserDocs(this.user._id);
    this.getUserClaims(this.user._id);
    this.userdocsApprove = new FormGroup({
      docName: new FormControl(),
    });
    this.statusForm = new FormGroup({
      claimStatus: new FormControl(''),
      comments: new FormControl('')
    })
    this.userdocsReject = new FormGroup({
      docName: new FormControl(),
      reason: new FormControl(),
    });
  }

  getUserPackages(userId) {
    this.empUserService.getUserPackages(userId).subscribe(
      (packages) => {
        this.userPackage = packages;
        this.dataSourceForPackages = new MatTableDataSource(this.userPackage);
        this.dataSourceForPackages.paginator = this.paginator;
        this.dataSourceForPackages.sort = this.sort;
      },
      (err) => {
        this._snackBar.open('Error while fetching Packages', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  getUserClaims(userId) {
    this.empUserService.getUserClaims(userId).subscribe(
      (claims) => {
        this.userClaims = claims;
        this.dataSourceForClaims = new MatTableDataSource(this.userClaims);
        this.dataSourceForClaims.paginator = this.paginator;
        this.dataSourceForClaims.sort = this.sort;
      }, (err) => {
        this._snackBar.open('Error while fetching Claims', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  getUserDocs(userId) {
    this.empUserService.getDocs(userId).subscribe(
      (docs) => {
        this.docs = docs
      },
      (err) => {
        this._snackBar.open('Error while fetching User documents', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    );
  }

  applyFilterPackages(filterValue: string) {
    this.dataSourceForPackages.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceForPackages.paginator) {
      this.dataSourceForPackages.paginator.firstPage();
    }
  }

  applyFilterClaims(filterValue: string) {
    this.dataSourceForClaims.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceForClaims.paginator) {
      this.dataSourceForClaims.paginator.firstPage();
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index > 1) {
      this.showFilter = false;
    }
    else {
      this.showFilter = true;
    }
  }

  approveIt() {
    var docId = this.empUserService.getDocId();
    this.empUserService.approveDoc(docId, this.userdocsApprove.value.docName).subscribe(
      (approved) => {
        this._snackBar.open('Approved successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
      },
      (err) => {
        this._snackBar.open('Error while approving', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  rejectIt() {
    var docId = this.empUserService.getDocId();
    this.empUserService.rejectDoc(docId, this.userdocsReject.value.reason, this.userdocsReject.value.docName).subscribe(
      (rejected) => {
        this.empUserService.setUser(this.user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/home/userDetails']);
      },
      (err) => {
        this._snackBar.open('Error while rejecting', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  setDocId(docId) {
    this.empUserService.setDocId(docId);
  }

  getRecord(userClaims) {
    this.claimDetails = userClaims;
  }

  updateStatus() {
    this.empUserService.setStatus(this.statusForm.value, this.claimDetails._id).subscribe((statusUpd) => {
      this.getUserClaims(this.user._id);
    })
  }

  cancel() {
    this.location.back();
  }
}
