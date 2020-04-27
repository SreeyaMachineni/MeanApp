import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { UserClaimsService } from '../../user-claims/user-claims.service';
import { UserClaims } from '../../user-claims/user-claims';
import { EmployeeUsersService } from '../../employee-users/employee-users.service';
import { AuthService } from '../../auth.service';
import { UserPackagesService } from '../../user-packages/user-packages.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  notifications: any;
  userClaims: any;
  user: User;
  claim: UserClaims;
  selectedUser: any;
  userPackage: any;
  userHasClaims = false;
  userHasPackages = false;
  userHasNotifications = false;
  show = true;
  currentHours: any;
  greeting: any;
  currentDate:any;

  constructor(private router: Router, private userClaimService: UserClaimsService,
    private empUserService: EmployeeUsersService, 
    private authService: AuthService, 
    private userPackagesService: UserPackagesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.currentDate = new Date().toISOString();
    // this.currentHours = new Date().getHours();
    // if (this.currentHours < 12) {
    //   this.greeting = 'Good Morning ';
    // }
    // else if (this.currentHours < 4) {
    //   this.greeting = 'Good Afternoon ';
    // }
    // else {
    //   this.greeting = 'Good Evening ';
    // }

    this.getNotification(this.user['id']);
    this.fetchUserPackages();

    if (this.user.userrole == 'user') {
      this.fetchUserClaims();
    }
    if (this.user.userrole == 'employee') {
      this.fetchPendingClaims(this.user['id']);
    }
    if (this.user.userrole == 'poc') {
      this.fetchClaimsByHospital(this.user['id']);
    }
  }

  getNotification(userId) {
    this.authService.getNotifications(userId).subscribe(
      (notifications) => {
        this.notifications = notifications;
        if (this.notifications.length > 0) {
          this.userHasNotifications = true;
        }
      }
    )
  }

  fetchUserClaims() {
    let pendingStatus = ['Pending', 'Docs Required'];
    this.userClaimService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (claims) => {
        this.userClaims = claims;
        this.userClaims = this.userClaims.filter(f=> f.status === 'Pending' || f.status === 'Docs Required');
        if (this.userClaims.length > 0) {
          this.userHasClaims = true;
        }
      }, (err) => {
        this._snackBar.open('Error while fetching Claims', 'x', { duration: 3000 });
      }
    )
  }

  fetchUserPackages() {
    var userId = JSON.parse(localStorage.getItem('user')).id;
    this.userPackagesService.fetchUserPackages(userId).subscribe(
      (userPackage) => {
        this.userPackage = userPackage;
        this.userPackage = this.userPackage.filter(f=> f.activeTo >= this.currentDate);
        if (this.userPackage.length > 0) {
          this.userHasPackages = true;
        }
      },
      (err) => this._snackBar.open('Error while fetching Hospitals', 'x', { duration: 3000 })
    );
  }

  fetchPendingClaims(empId) {
    this.userClaimService.getEmployeeClaims(empId).subscribe(
      (claims) => {
        this.userClaims = claims;
      }, (err) => {
        this._snackBar.open('Error while fetching Claims', 'x', { duration: 3000 });
      }
    )
  }

  fetchClaimsByHospital(pocId) {
    this.userClaimService.getClaimsByHospital(pocId).subscribe(
      (claims) => {
        this.userClaims = claims 
      }, (err) => {
        this._snackBar.open('Error while fetching Claims', 'x', { duration: 3000 });
      }
    )
  }

  setClaim(claim, e) {
    if (!claim.comments || claim.comments == ' ') {
      claim.comments = 'No comments available'
    }
    this.claim = claim;
  }

  userDetails(claim) {
    this.authService.getUserById(claim.claims.userId).subscribe((user) => {
      this.selectedUser = user;
      this.empUserService.setUser(this.selectedUser);
      this.router.navigate(['/home/userDetails']);
    })
  }

  notificationDetails(notification) {
    if (notification.category == 'claim' || notification.category == 'package') {
      if (this.user.userrole == 'employee') {
        this.authService.getUserById(notification.notifyAbout).subscribe(
          (user) => {
            this.empUserService.setUser(user);
            this.router.navigate(['/home/userDetails']);
            this.authService.updateNotification(notification._id).subscribe(
              (updated) => {
                this._snackBar.open('Notifications updated successfully', 'x', { duration: 3000 });
              },
              (err) => {
                this._snackBar.open('Error while updating Notification', 'x', { duration: 3000 });
              }
            )
          },
          (err) => this._snackBar.open('Error while fetching Notifications', 'x', { duration: 3000 })
        )
      } else if (this.user.userrole == 'user') {
        if (notification.category == 'claim') {
          this.router.navigate(['/home/myclaims']);
        }
        if (notification.category == 'package') {
          this.router.navigate(['/home/mypackages']);
        }
      }
    }
    else if (notification.category == 'docs') {
      this.router.navigate(['/profile']);
      this.authService.updateNotification(notification._id).subscribe(
        (updated) => {
          this._snackBar.open('Notification updated succeessfully', 'x', { duration: 3000 });
        },
        (err) => {
          this._snackBar.open('Error while fetching Notifications', 'x', { duration: 3000 });
        }
      )
    }
  }

  claimDetails(claim) {
    this.userClaimService.setClaim(claim);
    this.router.navigate(['/home/claimDetails']);
  }

  addClaim(){
    this.userClaimService.setAction('Add');
    this.router.navigate(['/home/addUserClaim']);
  }

  addPackage(){
    this.userPackagesService.setAction('add');
    this.router.navigate(['/home/addOrEditUserPackage']);
  }
}
