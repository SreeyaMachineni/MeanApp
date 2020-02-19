import { Component, OnInit,ViewChild } from '@angular/core';
import {User} from '../../user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {EmployeeUsersService} from '../employee-users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employee-users',
  templateUrl: './employee-users.component.html',
  styleUrls: ['./employee-users.component.css']
})
export class EmployeeUsersComponent implements OnInit {
user:any;
//insurer:any;
  displayedColumns: string[] = ['firstName', 'phone', 'email'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
constructor(private empUserService:EmployeeUsersService, private router: Router) { }
  ngOnInit() {
    this.getEmpUsers();
  }

  getEmpUsers(){
    this.empUserService.getEmpUsers(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (users)=>{
        this.user = users;
        console.log(this.user);
        this.dataSource = new MatTableDataSource(this.user);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (err)=>{console.log(err)}
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
