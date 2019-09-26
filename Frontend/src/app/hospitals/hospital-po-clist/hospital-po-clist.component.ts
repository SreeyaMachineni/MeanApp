import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HospitalPocService} from '../hospital-poc.service';
@Component({
  selector: 'app-hospital-po-clist',
  templateUrl: './hospital-po-clist.component.html',
  styleUrls: ['./hospital-po-clist.component.css']
})
export class HospitalPoCListComponent implements OnInit {

  constructor(private router:Router,private hospitalPocService:HospitalPocService) { }

  ngOnInit() {
  }
  addHospPoC(){
    this.hospitalPocService.setAction('Add');
    this.router.navigate(['/home/addOrEditHospitalPoc']);
  }

}
