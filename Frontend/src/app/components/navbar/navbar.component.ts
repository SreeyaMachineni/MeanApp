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
  //menuItems=[];
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    var userRole = this.user.userrole;
    this.authService.getMenus(userRole).subscribe(
      (data)=>{ this.menu=data; },
      (err)=>{ console.log(err); }
    );
    this.authService.getNumOfUsersToAssign().subscribe(
      (count)=>{
        this.NoOfUsersToAssign = count;
      },(err)=>{
        console.log('all users assigned');
      }
    )
    
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
      }
}
