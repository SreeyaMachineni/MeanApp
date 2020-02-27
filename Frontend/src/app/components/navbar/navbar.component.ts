import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Menu } from '../../menu';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { EmployeeUsersService } from '../../employee-users/employee-users.service';
import { ContactService } from '../../contact/contact.service';
import { UserClaimsService } from '../../user-claims/user-claims.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  empUser: any;
  user: User;
  menu: any;
  NoOfUsersToAssign: any;
  NoOfPkgsToVisit: any;
  notifications: any;
  noOfNotifications: any;
  contactForm: FormGroup;
  contact: any;
  users: any;
  userrole: any;
  claim: any;
  userContacts: any;
  userClaim: any;
  options: string[] = [' Notify only the Employee', 'Notify user and Employee'];

  constructor(private authService: AuthService, 
    private router: Router,
    private empUserService: EmployeeUsersService, 
    private contactService: ContactService, 
    private userClaimService: UserClaimsService, 
    private _snackBar: MatSnackBar) { }
  
    ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var userRole = this.user.userrole;
    var assignedTo = this.user.assignedTo;
    this.getMenus(userRole);
    this.getNumOfUsersToAssign();
    this.getNotification(this.user['id']);
    this.userClaim = this.userClaimService.getClaim();
    this.contact = {};
    this.contactForm = new FormGroup({
      regarding: new FormControl(''),
      description: new FormControl(''),
      user: new FormControl(' '),
      notifyOption: new FormControl('')
    });

    this.userrole = JSON.parse(localStorage.getItem('user')).userrole;
    if (this.userrole == 'user') {
      this.getMyContacts();
    }
    if (this.userrole == 'employee') {
      this.fetchEmpUsers(JSON.parse(localStorage.getItem('user')).id);
    }

  }

  getMyContacts() {
    this.contactService.getMyContacts(JSON.parse(localStorage.getItem('user')).id);
  }

 

  fetchEmpUsers(empId) {
    this.contactService.fetchEmpUsers(empId).subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        this._snackBar.open('Error while fetching Users', 'x', { duration: 3000 });
      }
    )
  }

  addContact() {
    this.contact.regarding = this.contactForm.value.regarding;
    this.contact.description = this.contactForm.value.description;
    this.contact.userrole = JSON.parse(localStorage.getItem('user')).userrole;
    //this.contact.userId = JSON.parse(localStorage.getItem('user')).id;
    if (this.userrole == 'user') {
      this.contact.userId = JSON.parse(localStorage.getItem('user')).id;
      this.contact.userEmpId = JSON.parse(localStorage.getItem('user')).userEmpId;
    } else if (this.userrole == 'employee') {
      this.contact.userEmpId = this.contactForm.value.user;
    } else if (this.userrole == 'poc') {
      this.claim = this.userClaimService.getClaim();
      this.contact.notifyOption = this.contactForm.value.notifyOption;
      this.contact.userEmpId = this.claim.userId;
   
    }

    this.contactService.addContact(this.contact).subscribe((contact) => {
      this._snackBar.open('Request submitted successfully', 'x', { duration: 3000 });
    })
  }

  getNumOfPkgsToVisit(assignedTo) {
    this.authService.getNumOfPkgsToVisit(assignedTo).subscribe(
      (count) => {
        this.NoOfPkgsToVisit = count;
      }, (err) => {
        this._snackBar.open('All packages visited', 'x', { duration: 3000 });
      }
    )
  }

  getNotification(userId) {
    this.authService.getNotifications(userId).subscribe(
      (notifications) => {
        this.notifications = notifications;
        this.noOfNotifications = this.notifications.length;
      }
    )
  }

  getNumOfUsersToAssign() {
    this.authService.getNumOfUsersToAssign().subscribe(
      (count) => {
        this.NoOfUsersToAssign = count;
      }, (err) => {
        this._snackBar.open('All users assigned', 'x', { duration: 3000 });
      }
    )
  }

  getMenus(userRole) {
    this.authService.getMenus(userRole).subscribe(
      (data) => {
      this.menu = data;
      },
      (err) => { this._snackBar.open('Error while fetching Menus', 'x', { duration: 3000 }); }
    );
  }

  onLogout() {
    this.authService.logout();
    this.authService.setLoggedIn(false);
    this.router.navigate(['/login']);
    return false;
  }

  notificationDetails(notification) {

    if (notification.category == 'claim' || notification.category == 'package') {
      this.authService.getUserById(notification.notifyAbout).subscribe(
        (user) => {
          this.empUserService.setUser(user);
          this.router.navigate(['/home/userDetails']);
          this.authService.updateNotification(notification._id).subscribe(
            (updated) => {
              this._snackBar.open('Notification updated successfully', 'x', { duration: 3000 });
            },
            (err) => {
              this._snackBar.open('Error while fetching Notifications', 'x', { duration: 3000 })
            }
          )
        },

        (err) => { this._snackBar.open('Error while fetching Notifications', 'x', { duration: 3000 }) }
      )
    }
    else if (notification.category == 'docs') {
      this.router.navigate(['/profile']);
      this.authService.updateNotification(notification._id).subscribe(
        (updated) => {
          this._snackBar.open('Notification updated successfully', 'x', { duration: 3000 });
        },
        (err) => {
          this._snackBar.open('Error while fetching Notifications', 'x', { duration: 3000 })
        }
      )
    }
  }
}
