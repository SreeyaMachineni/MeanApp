import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../user';
import {UserClaimsService} from '../../user-claims/user-claims.service';
import { UserClaims } from '../../user-claims/user-claims';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userClaims:any;
  user:User;
  claim:UserClaims;
    constructor(private router: Router,private userClaimService:UserClaimsService) { }

    ngOnInit() {
      this.user = JSON.parse(localStorage.getItem('user'));
      if(this.user.userrole == 'user'){
        this.fetchUserClaims();
      }
      if(this.user.userrole == 'employee'){
        //this.fetchPendingClaims()
      }
      
    }
    fetchUserClaims(){
      this.userClaimService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
        (claims)=>{
          this.userClaims = claims;
          console.log(this.userClaims);        
        },(err)=>{
          console.log('err in fetching claims');
        }
      )
    }
    setClaim(claim){
      this.claim=claim;
    }
}
