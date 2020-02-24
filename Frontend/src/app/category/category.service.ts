import { Injectable } from '@angular/core';
import {Category} from '../category/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import * as environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
category:Category;
url = environment.environment.ServerUrl;
action:String;
categoryId:any;
constructor(private http: HttpClient) { }

  addCategory(category:Category){
    return this.http.post(this.url+'/category/addCategory',{category},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }

  fetchCategories(){
    return this.http.get(this.url+'/category/getCategories');
  }

  deleteCategory(categoryId){
    return this.http.get(this.url+'/category/deleteCategory/'+categoryId);
  }

  editCategory(categoryId,category){
    return this.http.post(this.url+'/category/editCategory/'+categoryId,{category},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }

  setCategory(category){
    this.category=category;
  }

  getCategory(){
    return this.category;
  }

  setAction(action){
    this.action = action;
  }

  getcategoryId(){
    return this.categoryId;
  }
  
  setcategoryId(categoryId){
    this.categoryId = categoryId;
  }
}
