import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ContactService} from '../contact.service';
import {UserClaimsService} from '../../user-claims/user-claims.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactService:ContactService,private claimService:UserClaimsService,private _snackBar: MatSnackBar) { }
  contactForm:FormGroup;
  contact:any;
  users:any;
  userrole:any;
  claim:any;
  userContacts:any;
  //options: string[] = ['Notify Only Employee','Notify user and Employee'];
  ngOnInit() {
    this.contact = {};

    this.contactForm = new FormGroup({
      regarding:new FormControl(''),
      description:new FormControl(''),
      user:new FormControl(' '),
      notifyOption:new FormControl('')
    });
    
    this.userrole = JSON.parse(localStorage.getItem('user')).userrole;
    if(this.userrole == 'user'){
      this.getMyContacts();
    }
    if(this.userrole == 'employee'){
      this.fetchEmpUsers(JSON.parse(localStorage.getItem('user')).id);
    }
  }
  getMyContacts(){
    this.contactService.getMyContacts(JSON.parse(localStorage.getItem('user')).id);
  }
  fetchEmpUsers(empId){
    this.contactService.fetchEmpUsers(empId).subscribe(
      (users)=>{
        this.users = users;
      },
      (err)=>{
        console.log('failed to fetch')
      }
    )
  }
  addContact(){
    
    this.contact.regarding = this.contactForm.value.regarding;
    this.contact.description = this.contactForm.value.description;
    this.contact.userrole = JSON.parse(localStorage.getItem('user')).userrole;

    if(this.userrole == 'user'){
      this.contact.userId = JSON.parse(localStorage.getItem('user')).id;
      this.contact.userEmpId = JSON.parse(localStorage.getItem('user')).userEmpId;
    }else if(this.userrole == 'employee'){
      this.contact.userEmpId = this.contactForm.value.user;
    }else if(this.userrole == 'poc'){
      console.log(this.contactForm.value);
      
      this.claim = this.claimService.getClaim();
      this.contact.notifyOption = this.contactForm.value.notifyOption;
      this.contact.userEmpId = this.claim.userId;
    }
    
    console.log('trying to contact');
    this.contactService.addContact(this.contact).subscribe((contact)=>{
      console.log(contact);
      this._snackBar.open('Your request has been submited', 'x', {
        duration: 3000
      });
    })
  }

}
