import { Component, OnInit } from '@angular/core';
import {InsurerService} from '../../insurer/insurer.service';
import {Insurer} from '../../insurer/insurer';
@Component({
  selector: 'app-insurer-list',
  templateUrl: './insurer-list.component.html',
  styleUrls: ['./insurer-list.component.css']
})
export class InsurerListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addInsurer(){
    
  }

}
