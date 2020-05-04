import { Component, OnInit,ViewChild } from '@angular/core';
import {HospitalPocService} from '../hospital-poc.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hospital } from 'src/app/hospital';

@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})

export class HospitalDetailsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'phone', 'email', 'address', 'actions'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hospital:any;
  poc:any;
  deletePocId; any;

  constructor(private hospitalPocService:HospitalPocService,
    private router:Router,
    private location: Location,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.hospital = this.hospitalPocService.getHospital();
    this.hospitalPocService.setHospital(this.hospital);
    this.fetchPocs();
  }

  fetchPocs(){
    this.hospitalPocService.getPocs(this.hospital._id).subscribe(
      (poc)=>{
        this.poc = poc;  
        this.dataSource = new MatTableDataSource(this.poc);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },(err)=>{
        this._snackBar.open('Error while fetching POCs', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  deletePoc(pocId){
    this.hospitalPocService.deletePoc(pocId).subscribe(
      (deleted)=>{
        this._snackBar.open('PoC deleted successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
        this.fetchPocs();
      }, (err)=>{
        this._snackBar.open('Error while deleting PoCs', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      }
    )
  }

  editPoc(poc,pocId){
    this.hospitalPocService.setAction('Edit');
    this.hospitalPocService.setHospPoc(poc);
    this.router.navigate(['/home/addOrEditHospitalPoc']);
  }

  addHospPoC(){
    this.hospitalPocService.setAction('Add');
    this.router.navigate(['/home/addOrEditHospitalPoc']);
  }
 
  cancel(){
    this.location.back();
  }

  setDeletePocId(pocId, e) {
    this.deletePocId = pocId;
  }

}
