import { Component, OnInit } from '@angular/core';
import {UserClaimsService} from '../user-claims.service';
// import {ContactComponent} from '../../contact/contact/contact.component';
@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {
  claim:any;
  userrole:any;
  constructor(private userClaimService:UserClaimsService) { }

  ngOnInit() {
    this.claim = this.userClaimService.getClaim();
    this.userrole = JSON.parse(localStorage.getItem('user')).userrole;
  }

}
