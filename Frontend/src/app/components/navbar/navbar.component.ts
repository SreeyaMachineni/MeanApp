import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Menu} from '../../menu';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:User;
  menu:any;
  NoOfUsersToAssign:any;
  NoOfPkgsToVisit:any;
  notifications:any;
  //menuItems=[];
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var userRole = this.user.userrole;
    var assignedTo = this.user.assignedTo;
    this.getMenus(userRole);
    this.getNumOfUsersToAssign();
    console.log(this.user);
    this.getNotification(this.user['id']);
  //  this.getNumOfPkgsToVisit(assignedTo);
    
    
  }
  getNumOfPkgsToVisit(assignedTo){
    this.authService.getNumOfPkgsToVisit(assignedTo).subscribe(
      (count)=>{
        this.NoOfPkgsToVisit = count;
      },(err)=>{
        console.log('all packages visited');
      }
    )
  }
  getNotification(userId){
    console.log('get notification'+userId);
    this.authService.getNotifications(userId).subscribe(
      (notifications)=>{
        console.log(notifications);
        this.notifications = notifications;
      }
    )
  }

  getNumOfUsersToAssign(){
    this.authService.getNumOfUsersToAssign().subscribe(
      (count)=>{
        this.NoOfUsersToAssign = count;
      },(err)=>{
        console.log('all users assigned');
      }
    )
  }

  getMenus(userRole){
    this.authService.getMenus(userRole).subscribe(
      (data)=>{ this.menu=data; 
      
      },
      (err)=>{ console.log(err); }
    );
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
      }
}
