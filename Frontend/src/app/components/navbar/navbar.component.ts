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
  //menuItems=[];
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    var userRole = this.user.userrole;
    console.log(userRole+'getting user role in nav');
    this.authService.getMenus(userRole).subscribe(
      (data)=>{
        this.menu=data;
      },
      (err)=>{
        console.log(err);
      }
    )
    
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
      }
}
