import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

var URL = 'http://localhost:3000/docs/upload/';
http: HttpClient;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;
  id: String;
  public uploader: FileUploader;
  docs: any;
  changePwd = false;
  passwordForm: FormGroup;

  constructor(private authService: AuthService, 
    private router: Router, 
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = JSON.parse(localStorage.getItem('user')).id;
    this.getDocs(this.id);
    URL = URL + this.id;
    this.uploader = new FileUploader({ url: URL, itemAlias: 'photo' });
    this.buildData();
    this.passwordForm = new FormGroup({
      currentPwd: new FormControl(''),
      changedPwd: new FormControl('')
    });
  }

  getDocs(id) {
    this.authService.getDocs(this.id).subscribe(
      (docs) => { this.docs = docs; },
      (err) => { this._snackBar.open('Error while fetching documents', 'x', { duration: 3000 }); }
    )
  }

  buildData() {
    this.uploader.onBuildItemForm = (FileItem: any, form: any) => {
      form.append('id', this.id);
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      if (response) {

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile']);
      }
    }
  }
  setChangePwd() {
    this.changePwd = true;
  }

  cancel() {
    this.changePwd = false;
  }

  saveit() {
    this.authService.changePwd(this.passwordForm.value.currentPwd, this.passwordForm.value.changedPwd).subscribe(
      (changed) => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/profile']);
        this._snackBar.open('Password updated successfully', 'x', { duration: 3000 })
      },
      (err) => {
        this._snackBar.open('Error while updating Password', 'x', { duration: 3000 })
      }
    )
  }

  editUser(user) {
    this.authService.setUser(user);
    this.router.navigate(['/home/editUser']);
  }
}
