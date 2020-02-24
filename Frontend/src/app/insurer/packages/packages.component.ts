import { Component, OnInit,ViewChild } from '@angular/core';
import {PackageService} from '../../insurer/package.service';
import {Package} from '../../insurer/package';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Insurer} from '../insurer';
import {InsurerService} from '../insurer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})

export class PackagesComponent implements OnInit {
  packge:any;
  insurer:Insurer;
  displayedColumns: string[] = ['name','insProvider', 'insCategory', 'premiumAmnt','maxSumAssured','actions'];
  dataSource: MatTableDataSource<Package>;
  expandedElement: Package | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private router:Router,
    private packageService:PackageService,
    private insurerService:InsurerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.packge = new Package();
    this.insurer = this.insurerService.getInsurer();
    this.fetchPackages(this.insurer['_id']);
  }

  addPackage(){
    this.packageService.setAction('add');
    this.router.navigate(['/home/addOrEditPackage'])  
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchPackages(insurerId){
    this.packageService.fetchPackages(insurerId).subscribe(
      (packge)=>{
        this.packge = packge;
        this.dataSource = new MatTableDataSource(this.packge);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       },
      (err)=>this._snackBar.open('Error while fetching Packages', 'x', { duration: 3000 })
    
    );
  }

  deletePackage(packageId) {
    this.packageService.deletePackage(packageId).subscribe(
      (success)=>{
        if(success['success']){
         // this.fetchPackages();
          this._snackBar.open('Package deleted successfully', 'x', { duration: 3000 })
          this.router.navigate(['/home/insurers']);
        }
      },
      (err)=>{
        this._snackBar.open('Error while deleting Package', 'x', { duration: 3000 })
      }
    )
  }

  editPackage(packge,packageId){
    this.packageService.setAction('edit');
    this.packageService.setPackage(packge);
    this.router.navigate(['/home/addOrEditPackage']);
  }

}
