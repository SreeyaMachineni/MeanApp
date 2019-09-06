import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {Menu} from '../../menu';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import {EmployeeUsersService} from '../../employee-users/employee-users.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  empUser:any;
  user:User;
  menu:any;
  NoOfUsersToAssign:any;
  NoOfPkgsToVisit:any;
  notifications:any;
  noOfNotifications:any;
  constructor(private authService:AuthService,private router: Router,private empUserService:EmployeeUsersService) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var userRole = this.user.userrole;
    var assignedTo = this.user.assignedTo;
    this.getMenus(userRole);
    this.getNumOfUsersToAssign();
    this.getNotification(this.user['id']);
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
    this.authService.getNotifications(userId).subscribe(
      (notifications)=>{
        this.notifications = notifications;
        this.noOfNotifications = this.notifications.length;
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

  notificationDetails(notification){

    if(notification.category == 'claim' || notification.category == 'package'){

      this.authService.getUserById(notification.notifyAbout).subscribe(

        (user)=>{
          this.empUserService.setUser(user);
          this.router.navigate(['/home/userDetails']);
          this.authService.updateNotification(notification._id).subscribe(
            (updated)=>{
              console.log('updated')
            },
            (err)=>{
              console.log('failed to fetch')
          }
            )  },
          
          (err)=>{console.log('failed to fetch')}
          )
        
      
    }
    else if(notification.category == 'docs'){
      this.authService.getUserById(notification.userId).subscribe(
        (user)=>{
          this.authService.updateNotification(notification._id).subscribe(
          (updated)=>{
            this.router.navigate(['/profile']);
          },
          (err)=>{console.log('failed to fetch');},
          
          )
        }
      )
    }
  }
}
