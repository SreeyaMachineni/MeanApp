import { Component, OnInit ,ViewChild} from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DoctorVisitService} from '../../doctor-visit/doctor-visit.service';
import {DoctorVisit} from '../doctor-visit';
@Component({
  selector: 'app-doctor-visit',
  templateUrl: './doctor-visit.component.html',
  styleUrls: ['./doctor-visit.component.css']
})
export class DoctorVisitComponent implements OnInit {
  displayedColumns: string[] = ['hospital', 'purpose', 'dateOfVisit', 'actions'];
  dataSource: MatTableDataSource<DoctorVisit>;
  expandedElement: DoctorVisit | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private doctorVisit:DoctorVisitService) { }
  doctorVisits:any;
  ngOnInit() {
    this.fetchDoctorVisits();
  }
  addDoctorVisit(){
    this.doctorVisit.setAction('Add');
  this.router.navigate(['/home/addOrEditDoctorVisit'])
  }
  fetchDoctorVisits(){
    this.doctorVisit.fetchDoctorVisits(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (doctorVisits)=>{
        this.doctorVisits = doctorVisits;
        this.dataSource = new MatTableDataSource(this.doctorVisits);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editDoctorVisit(doctorVisit){
    console.log(doctorVisit);
    this.doctorVisit.setAction('Edit');
    this.doctorVisit.setVisit(doctorVisit);
    this.router.navigate(['/home/addOrEditDoctorVisit'])
  }
  deleteDoctorVisit(visitId){
    this.doctorVisit.deleteVisit(visitId).subscribe(
      (deleted)=>{
        this.fetchDoctorVisits();
      }
    )
  }

}
