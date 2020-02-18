import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../user';
import {UserClaimsService} from '../../user-claims/user-claims.service';
import { UserClaims } from '../../user-claims/user-claims';
import {EmployeeUsersService} from '../../employee-users/employee-users.service';
import {AuthService} from '../../auth.service';
import {UserPackagesService} from '../../user-packages/user-packages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notifications:any;
  userClaims:any;
  user:User;
  claim:UserClaims;
  selectedUser:any;
  userPackage:any;
  userHasClaims=false;
  userHasPackages=false;
  userHasNotifications=false;
  show =true;
  currentHours:any;
  greeting:any;

  // @ViewChild("status", {static:false}) somename: ElementRef;

  
    constructor(private router: Router,private userClaimService:UserClaimsService,
      private empUserService:EmployeeUsersService,private authService:AuthService,private userPackages:UserPackagesService) { }

    ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.currentHours = new Date().getHours();
      if(this.currentHours < 12) {
        this.greeting = 'Good Morning ';
      }
      else if(this.currentHours < 4) {
        this.greeting = 'Good Afternoon ';
      }
      else {
        this.greeting = 'Good Evening ';
      }

      this.getNotification(this.user['id']);
      this.fetchUserPackages();
      
      if(this.user.userrole == 'user'){
        this.fetchUserClaims();
      }
      if(this.user.userrole == 'employee'){
       this.fetchPendingClaims(this.user['id']);
      }
      if(this.user.userrole == 'poc'){
        console.log('poc')
        console.log(this.user['id']);
        this.fetchClaimsByHospital(this.user['id']);
      }
      
    }
    getNotification(userId){
      this.authService.getNotifications(userId).subscribe(
        (notifications)=>{
          this.notifications = notifications;
          if(this.notifications.length > 0){
            this.userHasNotifications = true;
          } 
        }
      )
    }
    fetchUserClaims(){
      this.userClaimService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
        (claims)=>{
          this.userClaims = claims;
          if(this.userClaims.length > 0){
            this.userHasClaims = true;
          }      
        },(err)=>{
          console.log('err in fetching claims');
        }
      )
    }
    fetchUserPackages(){
      var userId =JSON.parse(localStorage.getItem('user')).id;
    this.userPackages.fetchUserPackages(userId).subscribe(
      (userPackage)=>{
        this.userPackage = userPackage;
        if(this.userPackage.length > 0){
          this.userHasPackages = true;         
        }
       },
      (err)=>console.log('err in fetching hospitals')
    
    );
    }
    fetchPendingClaims(empId){
      this.userClaimService.getEmployeeClaims(empId).subscribe(
        (claims)=>{
          this.userClaims = claims;
        },(err)=>{
          console.log('err in fetching claims');
        }
      )
    }
    fetchClaimsByHospital(pocId){
      this.userClaimService.getClaimsByHospital(pocId).subscribe(
        (claims)=>{
          this.userClaims = claims
          console.log(this.userClaims);
        },(err)=>{
          console.log('err in fetching')
        }
      )
    }
    setClaim(claim,e){
      // event.preventDefault();
      // event.stopPropagation();
      this.claim=claim;
      // this.somename.nativeElement.show();
      // return false;
  
      
    }
    userDetails(claim){
      this.authService.getUserById(claim.claims.userId).subscribe((user)=>{
        this.selectedUser = user;
        this.empUserService.setUser(this.selectedUser);
        this.router.navigate(['/home/userDetails']);
      })
    }

    notificationDetails(notification){
      if(notification.category == 'claim' || notification.category == 'package'){
        if(this.user.userrole == 'employee'){
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
        }else if(this.user.userrole == 'user'){
          if(notification.category == 'claim'){
            this.router.navigate(['/home/myclaims']);
          }
          if(notification.category == 'package'){
            this.router.navigate(['/home/mypackages']);
          }
        }
        
      }
      else if(notification.category == 'docs'){
          this.router.navigate(['/profile']); 
            this.authService.updateNotification(notification._id).subscribe(
            (updated)=>{
              console.log(updated);
            },  
            (err)=>{console.log('failed to fetch');
          }
            )
      }
    }
    claimDetails(claim){
      this.userClaimService.setClaim(claim);
      this.router.navigate(['/home/claimDetails']);
    }
}
