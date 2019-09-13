import { Component, OnInit,ViewChild } from '@angular/core';
import {HospitalPocService} from '../hospital-poc.service';
import {Hospital} from '../../hospital';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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
  constructor(private hospitalPocService:HospitalPocService) { }

  ngOnInit() {
    this.hospital = this.hospitalPocService.getHospital();
    console.log(this.hospital._id);
    this.hospitalPocService.getPocs(this.hospital._id).subscribe(
      (poc)=>{
        console.log(poc);
        this.poc = poc;
        this.dataSource = new MatTableDataSource(this.poc);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },(err)=>{
        console.log(err);
      }
    )
  }
 
}
