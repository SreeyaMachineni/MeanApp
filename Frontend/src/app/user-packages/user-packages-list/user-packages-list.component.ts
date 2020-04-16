import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserPackagesService} from '../../user-packages/user-packages.service';
import {UserPackage} from '../../user-packages/user-packages';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-packages-list',
  templateUrl: './user-packages-list.component.html',
  styleUrls: ['./user-packages-list.component.css']
})

export class UserPackagesListComponent implements OnInit {
  userPackage:any;
  success = false;
  show = false;
  currentDate:any;
  deletePackageId: any;
  private alertSuccess: ElementRef;

 @ViewChild('alertSuccess',{static:false}) set content(content: ElementRef) {
    this.alertSuccess = content;
 }

  displayedColumns: string[] = ['package', 'insurer', 'category', 'activeFrom', 'activeTo', 'status', 'actions'];
  dataSource: MatTableDataSource<UserPackage>;
  expandedElement: UserPackage | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private router:Router,
    private userPackageService:UserPackagesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.currentDate = new Date().toISOString();
    this.userPackage = new UserPackage();
    this.fetchUserPackages();
  }

  ngAfterViewInit() {
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
      (err)=>this._snackBar.open('Error while fetching Packages', 'x', { duration: 3000 })   
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
        if(success['success']){
          this.show = this.success = true;
          this.fetchUserPackages();
          this._snackBar.open('Package deleted successfully', 'x', { duration: 3000 });    
        }
      },(err)=>{
        this._snackBar.open('Error while deleting Package', 'x', { duration: 3000 })
      }
    )
  }

  editPackage(pkg,packageId){
    this.userPackageService.setAction('edit');
    this.userPackageService.setUserPackage(pkg);
    this.router.navigate(['/home/addOrEditUserPackage']);
  }

  getRecord(pkg){
    this.userPackageService.setUserPackage(pkg);
    this.router.navigate(['/home/viewUserPackage'])
  }

  setDeletePackage(packageId, e) {
    this.deletePackageId = packageId;
  }

}
