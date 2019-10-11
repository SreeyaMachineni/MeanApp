import { Component, OnInit,ViewChild } from '@angular/core';
import {HospitalPocService} from '../hospital-poc.service';
import {Hospital} from '../../hospital';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-hospital-details',
  templateUrl: './hospital-details.component.html',
  styleUrls: ['./hospital-details.component.css']
})
export class HospitalDetailsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'phone', 'email','actions'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hospital:any;
  poc:any;
  constructor(private hospitalPocService:HospitalPocService,private router:Router) { }

  ngOnInit() {
    this.hospital = this.hospitalPocService.getHospital();
    this.fetchPocs();
  }

  fetchPocs(){
    this.hospitalPocService.getPocs(this.hospital._id).subscribe(
      (poc)=>{
        this.poc = poc;
        console.log(poc);
        this.dataSource = new MatTableDataSource(this.poc);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },(err)=>{
        console.log(err);
      }
    )
  }

  deletePoc(pocId){
    this.hospitalPocService.deletePoc(pocId).subscribe(
      (deleted)=>{
        this.fetchPocs();
      }
    )
  }

  editPoc(poc,pocId){
    this.hospitalPocService.setAction('Edit');
    this.hospitalPocService.setHospPoc(poc);
    this.router.navigate(['/home/addOrEditHospitalPoc']);
  }
 
}