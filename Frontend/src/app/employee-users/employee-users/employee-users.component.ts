import { Component, OnInit,ViewChild } from '@angular/core';
import {User} from '../../user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {EmployeeUsersService} from '../employee-users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-users',
  templateUrl: './employee-users.component.html',
  styleUrls: ['./employee-users.component.css']
})

export class EmployeeUsersComponent implements OnInit {
  user:any;
  displayedColumns: string[] = ['firstName', 'phone', 'email', 'address', 'actions'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

constructor(private empUserService:EmployeeUsersService, 
  private router: Router,
  private _snackBar: MatSnackBar) { }
  
ngOnInit() {
    this.getEmpUsers();
  }

  getEmpUsers(){
    this.empUserService.getEmpUsers(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (users)=>{
        this.user = users;
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (err)=>this._snackBar.open('Error while fetching Users', 'x', { duration: 3000 })
    )
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getRecord(user){
    this.empUserService.setUser(user);
    this.router.navigate(['/home/userDetails']);
  }

}
