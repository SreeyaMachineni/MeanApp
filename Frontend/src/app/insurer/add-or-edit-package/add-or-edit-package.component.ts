import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Package} from '../package';
import {PackageService} from '../package.service';
@Component({
  selector: 'app-add-or-edit-package',
  templateUrl: './add-or-edit-package.component.html',
  styleUrls: ['./add-or-edit-package.component.css']
})
export class AddOrEditPackageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
