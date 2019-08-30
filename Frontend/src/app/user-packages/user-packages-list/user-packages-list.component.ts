import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserPackagesService} from '../../user-packages/user-packages.service';
import {UserPackage} from '../../user-packages/user-packages'
@Component({
  selector: 'app-user-packages-list',
  templateUrl: './user-packages-list.component.html',
  styleUrls: ['./user-packages-list.component.css']
})
export class UserPackagesListComponent implements OnInit {
  userPackage:any;
  
  displayedColumns: string[] = ['category', 'insurer', 'package', 'activeFrom','activeTo','actions'];
  dataSource: MatTableDataSource<UserPackage>;
  expandedElement: UserPackage | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private userPackageService:UserPackagesService) { }

  ngOnInit() {
    
    this.userPackage = new UserPackage();
    this.fetchUserPackages();

  }
  fetchUserPackages(){
    var userId =JSON.parse(localStorage.getItem('user')).id;
    this.userPackageService.fetchUserPackages(userId).subscribe(
      (userPackage)=>{
        this.userPackage = userPackage;
        this.dataSource = new MatTableDataSource(this.userPackage);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       },
      (err)=>console.log('err in fetching hospitals')
    
    );
  }
  addUserPackage(){
    this.userPackageService.setAction('add');
    this.router.navigate(['/home/addOrEditUserPackage']);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deletePackage(packageId){
    this.userPackageService.deleteUserPackage(packageId).subscribe(
      (success)=>{
        this.fetchUserPackages();
      },(err)=>{
        console.log('could not delete')
      }
    )
  }
  editPackage(packge,packageId){
    this.userPackageService.setAction('edit');
    this.userPackageService.setUserPackage(packge);
    this.router.navigate(['/home/addOrEditUserPackage']);
  }
  getRecord(packge){
    this.userPackageService.setUserPackage(packge);
    this.router.navigate(['/home/viewUserPackage'])
  }

}
