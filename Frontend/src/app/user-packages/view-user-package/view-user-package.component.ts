import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserPackage} from '../../user-packages/user-packages';
import {UserPackagesService} from '../../user-packages/user-packages.service';
import { Package } from '../../package/package';
@Component({
  selector: 'app-view-user-package',
  templateUrl: './view-user-package.component.html',
  styleUrls: ['./view-user-package.component.css']
})
export class ViewUserPackageComponent implements OnInit {
  userPackage:UserPackage;
  package:any;
  constructor(private router:Router,private userPackageService:UserPackagesService) { }

  ngOnInit() {
    this.userPackage = this.userPackageService.getUserPackage();
    this.fetchPackageDetails(this.userPackage.packageId);
  }
  fetchPackageDetails(packge){
    this.userPackageService.getPackageDetails(packge).subscribe(
      (packages)=>{
        this.package = packages;
      },(err)=>{
        console.log('err in fetching package');
      }
    )
  }

}
