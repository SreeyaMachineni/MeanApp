import { Component, OnInit,ViewChild } from '@angular/core';
import {InsurerService} from '../../insurer/insurer.service';
import {Insurer} from '../../insurer/insurer';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-insurer-list',
  templateUrl: './insurer-list.component.html',
  styleUrls: ['./insurer-list.component.css']
})
export class InsurerListComponent implements OnInit {
  insurer:any;
  displayedColumns: string[] = ['name', 'location', 'pointOfContact', 'actions'];
  dataSource: MatTableDataSource<Insurer>;
  expandedElement: Insurer | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private insurerService:InsurerService) { }

  ngOnInit() {
    this.insurer = new Insurer();
    this.fetchInsurers();
  }
  addInsurer(){
    this.insurerService.setAction('add');
    this.router.navigate(['/home/addOrEditInsurer']);  
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchInsurers(){
    this.insurerService.fetchInsurers().subscribe(
      (insurer)=>{
        this.insurer = insurer;
        this.dataSource = new MatTableDataSource(this.insurer);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       },
      (err)=>console.log('err in fetching hospitals')
    );
  }
  deleteInsurer(insurerId) {
    this.insurerService.deleteInsurers(insurerId).subscribe(
      (success)=>{
        if(success['success']){
          this.fetchInsurers();
          this.router.navigate(['/home/insurers']);
        }
      },
      (err)=>{
        console.log('err occured while deleting');
      }
    )
  }
  editInsurer(hosp,hospid){
    this.insurerService.setAction('edit');
    this.insurerService.setInsurer(hosp);
    this.router.navigate(['/home/addOrEditInsurer']);
  }
  getRecord(insurer){
       this.insurerService.setInsurer(insurer);
    this.router.navigate(['/home/packages']);
  }

}
