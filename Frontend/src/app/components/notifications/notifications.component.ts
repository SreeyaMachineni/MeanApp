
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notification } from './../../user';
import { AuthService } from '../../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit {
  notifications: any;
  noOfNotifications: any;
  userHasNotifications = false;
  user: User;
  displayedColumns: string[] = ['comments', 'category', 'createDate', 'verified'];
  dataSource: MatTableDataSource<Notification>;
  expandedElement: Notification | null;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(private router:Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,) { }
  
  ngOnInit() {  
    this.user = JSON.parse(localStorage.getItem('user'));
    var userRole = this.user.userrole;
    this.getNotifications(this.user['id']);
  }

  getNotifications(userId) {
    this.authService.getNotifications(userId).subscribe(
      (notifications) => {
        this.notifications = notifications;
        this.notifications = this.notifications;
        this.dataSource = new MatTableDataSource(this.notifications);
        if (this.notifications.length > 0) {
          this.userHasNotifications = true;
          this.noOfNotifications = this.notifications.length;
        }
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}

