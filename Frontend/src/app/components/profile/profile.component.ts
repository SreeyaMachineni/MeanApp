import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import {  FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
var URL = 'http://localhost:3000/docs/upload/';
http:HttpClient;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User;
  id:String;
  public uploader: FileUploader;
  docs:any;
  changePwd = false;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    console.log('in init');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = JSON.parse(localStorage.getItem('user')).id;
    this.getDocs(this.id);
  URL=URL+this.id;
  this.uploader=new FileUploader({url:URL,itemAlias:'photo'});
  this.buildData();
  }
  getDocs(id){
    this.authService.getDocs(this.id).subscribe(
      (docs)=>{this.docs=docs;console.log(this.docs)},
      (err)=>{console.log(err)}
    )
  }
  buildData(){
    this.uploader.onBuildItemForm=(FileItem:any,form:any)=>{
      form.append('id',this.id);
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      if(response){
       console.log("response"+JSON.stringify(response));
     }
    }
  }
  setChangePwd(){
    this.changePwd = true;
  }

}
