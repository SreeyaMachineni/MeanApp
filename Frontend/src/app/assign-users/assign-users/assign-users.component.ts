import { Component, OnInit,ViewChild } from '@angular/core';
import {AuthService} from './../../auth.service';
import {User} from './../../user';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import {AssignUsersService} from '../../assign-users/assign-users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-users',
  templateUrl: './assign-users.component.html',
  styleUrls: ['./assign-users.component.css']
})

export class AssignUsersComponent implements OnInit {
  users:any;
  UnAssignedUsers:any;
  emps:any;
  insurer:any;
  displayedColumns: string[] = ['name', 'assignedTo'];
  assignUsersForm:FormGroup;
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private authService:AuthService,
    private assignUserService:AssignUsersService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
    this.getEmployees();
    this.getUnassignedUsers();
    this.assignUsersForm = new FormGroup(
      {
        firstName: new FormControl(''),
        assignedTo:new FormControl('')
      }
    );
  }

  getUnassignedUsers(){
    this.authService.getUnassignedUsers().subscribe(
      (users)=>{
        this.UnAssignedUsers = users;      
      },
      (err)=>
      this._snackBar.open('Error while fetching Users', 'x', { duration: 3000 })
    )
  }
  getUsers(){
    this.authService.getUsers().subscribe(
      (users)=>{
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
      },
      (err)=>
      this._snackBar.open('Error while fetching Users', 'x', { duration: 3000 })
    )
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getEmployees(){
    this.authService.getEmployees('employee').subscribe(
      (emps)=>{
        this.emps = emps;
      }
    )
  }
  userList:string[];
  emp:string;


  saveit(){
    this.emp = this.assignUsersForm.value.assignedTo;
    this.userList=this.assignUsersForm.value.firstName;
    this.assignUserService.assignUser(this.userList,this.emp).subscribe(
      (success)=>{
        this._snackBar.open('Users assigned successfully', 'x', { duration: 3000 })
        this.getUsers();
      },(err)=>{
        this._snackBar.open('Error while assigning Users', 'x', { duration: 3000 })
      }
    )
  }
}
