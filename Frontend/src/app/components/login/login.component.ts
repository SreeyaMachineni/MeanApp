import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../../user';
import { AuthService } from '../../auth.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser:User;
  invalid = false;
  constructor(private authService:AuthService,private router: Router,private toastrService:ToastrService) { }

  ngOnInit() {
    this.loginUser = new User();
  }
  loginForm = new FormGroup(
    {
      username:new FormControl(''),
      password:new FormControl('')
    }
  );

  loginSubmit(){
    
      console.log(this.loginForm.value);
     this.loginUser.firstName = this.loginForm.value.username;
      this.loginUser.password = this.loginForm.value.password;
      this.authService.authenticateUser(this.loginUser).subscribe(
        (data)=>{
          console.log(data['success']);
          if(data['success']){
           //  this.authService.storeUserData(data['token'],data['user']);
            console.log(data['expiresin']);
            this.authService.storeUserData(data['token'],data['user'],data['expiresin']);
            this.router.navigate(['/home']);
            console.log('data');
          }
          else {
            console.log('credentials failed');
            // this.toastrService.warning('invalid credentials','Warning');
            this.invalid = true;
          }
          
        },
        (err)=>console.log(err)
      );
    
  }
}
