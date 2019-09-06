import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Hospital, PointOfContact } from '../../hospital';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  hosp:any;
  displayedColumns: string[] = ['name', 'specialization', 'location','pointOfContact','actions'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.hosp = new Hospital();
    this.fetchHosp();
  }
  addHospital(){
    this.authService.setAction('add');
   this.router.navigate(['/home/addOrEditHospital']);
  }
  fetchHosp(){
    
    this.authService.getHospitals().subscribe(
      (hosp)=>{
        this.hosp = hosp;
        this.dataSource = new MatTableDataSource(this.hosp);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       },
      (err)=>console.log('err in fetching hospitals')
    
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteHosp(hospid) {
    console.log('delete'+hospid);
    this.authService.deleteHosp(hospid).subscribe(
      (success)=>{
        if(success['success']){
          this.fetchHosp();
          this.router.navigate(['/home/hospitals']);
        }
        
      },
      (err)=>{
        console.log('err occured while deleting');
      }
    )
  }
  editHosp(hosp,hospid){
    this.authService.setAction('edit');
    this.authService.setHosp(hosp);
    this.router.navigate(['/home/addOrEditHospital']);
  }

}
