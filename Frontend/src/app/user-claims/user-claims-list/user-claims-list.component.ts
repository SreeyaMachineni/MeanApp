import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserClaimsService} from '../user-claims.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserClaims} from '../user-claims';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-claims-list',
  templateUrl: './user-claims-list.component.html',
  styleUrls: ['./user-claims-list.component.css']
})
export class UserClaimsListComponent implements OnInit {
  userClaims:any;
  displayedColumns: string[] = ['packageName', 'disease', 'hospital', 'actions'];
  dataSource: MatTableDataSource<UserClaims>;
  expandedElement: UserClaims | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private userClaimsService:UserClaimsService,private _snackBar: MatSnackBar) { }
  ngOnInit() {  
    this.userClaims = new UserClaims();
    this.fetchUserClaims();
  }

//
 
 addClaim(){
    this.userClaimsService.setAction('Add');
    this.router.navigate(['/home/addUserClaim']);
  }
  fetchUserClaims(){
    this.userClaimsService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (claims)=>{
        this.userClaims = claims;
        this.dataSource = new MatTableDataSource(this.userClaims);
        this.dataSource.paginator = this.paginator;
       //this.dataSource.sort = this.sort;
      },(err)=>{
        console.log('err in fetching claims');

        
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteClaim(claimId){
    this.userClaimsService.deleteUserClaim(claimId).subscribe(
      (deleted)=>{
        this.fetchUserClaims();
        this._snackBar.open('Claim successfully deleted', 'x', {
          duration: 3000
        });
      },
      (err)=>{
        console.log('err in deleting')
      }
    )
  }
  editClaim(userClaims){
    this.userClaimsService.setAction('edit');
    this.userClaimsService.setClaim(userClaims);
    this.router.navigate(['/home/addUserClaim']);
  }
}
