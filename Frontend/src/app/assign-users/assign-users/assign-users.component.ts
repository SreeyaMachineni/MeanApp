import { Component, OnInit,ViewChild } from '@angular/core';
import {AuthService} from './../../auth.service';
import {User} from './../../user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.css']
})
export class AssignUsersComponent implements OnInit {
  users:any;
  insurer:any;
  displayedColumns: string[] = ['name', 'assignedTo'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this.authService.getUsers().subscribe(
      (users)=>{
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (err)=>{console.log('err fetching');}
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
