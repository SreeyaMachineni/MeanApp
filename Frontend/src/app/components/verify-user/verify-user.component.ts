import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})

export class VerifyUserComponent implements OnInit {
  otp: String;
  user: User;
  constructor(private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  otpForm = new FormGroup(
    {
      otp: new FormControl(''),
    }
  );

  verifyOtp() {
    this.user = this.authService.getUser();
    this.authService.createUser(this.otpForm.value.otp).subscribe(
      (data) => {
        if (data['success']) {
          this.authService.storeUserData(data['token'], data['user'], data['expiresin']);
          this.router.navigate(['/login']);
        }
        else {
          this._snackBar.open('Error while creating User', 'x', { duration: 3000 })
        }

      },
      (err) => this._snackBar.open('Error while creating User', 'x', { duration: 3000 })
    );
  }

}
