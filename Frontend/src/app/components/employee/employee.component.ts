import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from '../../user';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  emp:any;
  displayedColumns: string[] = ['firstName', 'phone', 'email', 'dob','gender','actions'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
     this.emp = new User();
     this.fetchemp();
    
    
  }
  fetchemp(){
    this.authService.getEmployees('employee').subscribe(
      (emp)=>{
        this.emp = emp;
        console.log(this.emp);
        this.dataSource = new MatTableDataSource(this.emp);
        this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       },
      (err)=>console.log('err in fetching employees')
    
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteEmp(empid) {
    console.log('delete'+empid);
    this.authService.deleteEmp(empid).subscribe(
      (success)=>{
        if(success['success']){
          console.log('deleted');
          this.fetchemp();
          this.router.navigate(['/home/employees']);
        }
        
      },
      (err)=>{
        console.log('err occured while deleting');
      }
    )
  }
  addEmp(){
    this.authService.setAction('add');
    this.router.navigate(['/home/addOrEditEmp']);
  }
  editEmp(emp:User,id){
    this.authService.setAction('edit');
    this.authService.setUser(emp);
    this.router.navigate(['/home/addOrEditEmp']); 
  }

}
