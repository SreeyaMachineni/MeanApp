import { Injectable } from '@angular/core';
import {Category} from '../category/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
category:Category;
uri = 'http://localhost:3000';
action:String;
categoryId:any;
constructor(private http: HttpClient) { }

  addCategory(category:Category){
    console.log(category);
    return this.http.post(this.uri+'/category/addCategory',{category},{
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    });
  }

  fetchCategories(){
    return this.http.get(this.uri+'/category/getCategories');
  }

  deleteCategory(categoryId){
    return this.http.get(this.uri+'/category/deleteCategory/'+categoryId);
  }

  editCategory(categoryId,category){
    return this.http.post(this.uri+'/category/editCategory/'+categoryId,{category},{
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
