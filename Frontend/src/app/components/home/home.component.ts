import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../user';
import { AuthService } from '../../auth.service';
import {UserClaimsService} from '../../user-claims/user-claims.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
selectedFile:File = null;
userClaims:any;
user:User;
  constructor(private authService:AuthService,private router: Router,private userClaimService:UserClaimsService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchUserClaims();
  }
  fetchUserClaims(){
    this.userClaimService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (claims)=>{
        this.userClaims = claims;    
      },(err)=>{
        console.log('err in fetching claims');
      }
    )
  }
//   onLogout(){
// this.authService.logout();
// this.router.navigate(['/login']);
// return false;
//   }

  onfileSelected(event){
    //console.log(event);
    this.selectedFile = event.target.files[0];
    //console.log(this.selectedFile);
    // const fd = new FormData();
    
    // // fd.append('image',this.selectedFile,this.selectedFile.name);
    // // console.log(fd['image']);
    // fd.set('image',this.selectedFile);
    console.log(fd);
    var fd={
       image:this.selectedFile,
       imagename:this.selectedFile.name 
    }
    
    // this.authService.fileUpload(fd).subscribe(

    // );

    this.authService.fileUpload(fd).subscribe(
      (data)=>{
        console.log(data['success']);
        
        
      },
      (err)=>console.log(err)
    );
  }
  upload(){
    this.authService.uploadImg().subscribe(
      ()=>{console.log('suc')},
      err=>console.log(err)
    )
  }


}
