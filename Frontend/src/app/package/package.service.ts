import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Package } from './package';

@Injectable({
  providedIn: 'root'
})

export class PackageService {
  package: Package;
  url = 'http://localhost:3000';
  action: String;
  packageId: any;
  constructor(private http: HttpClient) { }

  addPackage(packge) {
    return this.http.post(this.url + '/package/addpackage', { packge }, {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
      )
    });
  }

  fetchPackages() {
    return this.http.get(this.url + '/package/getpackages');
  }

  deletePackages(packageId) {
    return this.http.get(this.url + '/package/deletepackage/' + packageId);
  }

  editPackage(packageId, packge) {
    return this.http.post(this.url + '/package/editpackage/' + packageId, { packge }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  setAction(action) {
    this.action = action;
  }

  getAction() {
    return this.action;
  }

  setPackage(packge) {
    this.package = packge;
  }

  getPackage() {
    return this.package;
  }

}
