import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { AuthService } from '../../auth.service';
import { UserClaimsService } from '../../user-claims/user-claims.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedFile: File = null;
  userClaims: any;
  user: User;
  constructor(private authService: AuthService, 
    private router: Router, 
    private userClaimService: UserClaimsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchUserClaims();
  }
  fetchUserClaims() {
    this.userClaimService.getUserClaims(JSON.parse(localStorage.getItem('user')).id).subscribe(
      (claims) => {
        this.userClaims = claims;
      }, (err) => {
        this._snackBar.open('Error while fetching Claims', 'x', { duration: 3000 });
      }
    )
  }

  onfileSelected(event) {
    this.selectedFile = event.target.files[0];
    var fd = {
      image: this.selectedFile,
      imagename: this.selectedFile.name
    }

    this.authService.fileUpload(fd).subscribe(
      (data) => {
        this._snackBar.open('File uploaded successfully', 'x', { duration: 3000 });


      },
      (err) => this._snackBar.open('Error while uploading file', 'x', { duration: 3000 })
    );
  }

  upload() {
    this.authService.uploadImg().subscribe(
      () => { this._snackBar.open('File uploaded successfully', 'x', { duration: 3000 }); 
    },
      err => this._snackBar.open('Error while uploading file', 'x', { duration: 3000 })
    )
  }

}
