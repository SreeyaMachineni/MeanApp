import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  otp:String;
  user:User;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
  }

 otpForm = new FormGroup(
    {
      otp: new FormControl(''),
    }
  );
  verifyOtp(){
  this.user=this.authService.getUser();
  console.log('in verify'+this.user);
   this.authService.createUser(this.otpForm.value.otp).subscribe(
      (data)=>{
        console.log('added');
        if(data['success']){
          this.authService.storeUserData(data['token'],data['user'],data['expiresin']);
          this.router.navigate(['/home']);

        }
        else{
          console.log('err in creating user');
        }
        
      },
      (err)=>console.log(err)
    );

      // this.authService.sendOtp(this.otp).subscribe(
      //   ()=>console.log('succ'),
      //   err=>console.log('succ')
      // )
  }

}
