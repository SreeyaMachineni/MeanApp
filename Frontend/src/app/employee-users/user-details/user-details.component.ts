import { Component, OnInit,ViewChild } from '@angular/core';
import {EmployeeUsersService} from '../employee-users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserPackage} from '../../user-packages/user-packages';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import { UserClaims } from '../../user-claims/user-claims';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user:any;
  claimDetails:any;
  userPackage:any;
  userClaims:any;
  docs:any;
  statusForm:FormGroup;
  userdocsApprove:FormGroup;
  userdocsReject:FormGroup;
  displayedColumns: string[] = ['categoryName', 'insurerName', 'packageName', 'activeFrom','activeTo'];
  claimColumns:string[]=['packageName','hospital','location','dateOfSurgery','disease'];
  dataSourceForClaims:MatTableDataSource<UserClaims>;
  dataSource: MatTableDataSource<UserPackage>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private empUserService:EmployeeUsersService,private router: Router, private location: Location) { }


  ngOnInit() {
    this.user = this.empUserService.getUser();
    console.log(this.user);
    this.getUserPackages(this.user._id);

    this.getUserDocs(this.user._id);
    this.getUserClaims(this.user._id);
    this.userdocsApprove = new FormGroup({
      docName:new FormControl(),
    });
    this.statusForm = new FormGroup({
      claimStatus : new FormControl(''),
      comments : new FormControl('')
    })
    this.userdocsReject = new FormGroup({
      docName:new FormControl(),
      reason:new FormControl(),
    });
  }
  getUserPackages(userId){
    this.empUserService.getUserPackages(userId).subscribe(
      (packages)=>{
        this.userPackage = packages;
        console.log(this.userPackage);
        this.dataSource = new MatTableDataSource(this.userPackage);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (err)=>{
        console.log('err');
      }
    )
  }
  getUserClaims(userId){
    this.empUserService.getUserClaims(userId).subscribe(
      (claims)=>{
        this.userClaims = claims;
        console.log(this.userClaims);
        this.dataSourceForClaims = new MatTableDataSource(this.userClaims);
        this.dataSourceForClaims.paginator = this.paginator;
       this.dataSourceForClaims.sort = this.sort;
      },(err)=>{
        console.log(err);
      }
    )
  }
  getUserDocs(userId){
    this.empUserService.getDocs(userId).subscribe(
      (docs)=>{
        this.docs = docs
      },
      (err)=>{
        console.log('err in fetching')
      }
    );
  }
  approveIt(){
    var docId = this.empUserService.getDocId();
    this.empUserService.approveDoc(docId,this.userdocsApprove.value.docName).subscribe(
      (approved)=>{
        console.log('approved');
      },
      (err)=>{
        console.log('could not approve');
      }
    )
  }
  rejectIt(){
    var docId = this.empUserService.getDocId();
    this.empUserService.rejectDoc(docId,this.userdocsReject.value.reason,this.userdocsReject.value.docName).subscribe(
      (rejected)=>{
        console.log('rejected');
        this.empUserService.setUser(this.user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/home/userDetails']);
      },
      (err)=>{
        console.log('could not reject');
      }
    )
  }
  setDocId(docId){
    this.empUserService.setDocId(docId);
  }
  getRecord(userClaims){
    console.log(userClaims);
    this.claimDetails = userClaims;
    
  }
  updateStatus(){
    console.log(this.statusForm.value);
    this.empUserService.setStatus(this.statusForm.value,this.claimDetails._id).subscribe((statusUpd)=>{
      //console.log('')
      this.getUserClaims(this.user._id);
    })
  }
  
  cancel(){
    this.location.back();
  }
}
