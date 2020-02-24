import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hospital, PointOfContact } from '../../hospital';
import { AuthService } from '../../auth.service';
import { HospitalPocService } from '../../hospitals/hospital-poc.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})

export class HospitalsComponent implements OnInit {
  hosp: any;
  displayedColumns: string[] = ['name', 'specialization', 'location', 'actions'];
  dataSource: MatTableDataSource<Hospital>;
  expandedElement: Hospital | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private authService: AuthService, 
    private router: Router, 
    private hospitalPocService: HospitalPocService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.hosp = new Hospital();
    this.fetchHosp();
  }

  addHospital() {
    this.authService.setAction('add');
    this.router.navigate(['/home/addOrEditHospital']);
  }
  
  fetchHosp() {
    this.authService.getHospitals().subscribe(
      (hosp) => {
        this.hosp = hosp;
        this.dataSource = new MatTableDataSource(this.hosp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => this._snackBar.open('Error while fetching Hospitals', 'x', { duration: 3000 })
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHosp(hospid) {
    this.authService.deleteHosp(hospid).subscribe(
      (success) => {
        if (success['success']) {
          this._snackBar.open('Hospital deleted successfully', 'x', { duration: 3000 });
          this.fetchHosp();
          this.router.navigate(['/home/hospitals']);
        }

      },
      (err) => {
        this._snackBar.open('Error while deleting Hospital', 'x', { duration: 3000 });
      }
    )
  }

  editHosp(hosp, hospid) {
    this.authService.setAction('edit');
    this.authService.setHosp(hosp);
    this.router.navigate(['/home/addOrEditHospital']);
  }

  addHospPoC() {
    this.hospitalPocService.setAction('Add');
    this.router.navigate(['/home/addOrEditHospitalPoc']);
  }

  getRecord(hosp) {
    this.hospitalPocService.setHospital(hosp);
    this.router.navigate(['/home/hospitalDetails']);
  }

}
