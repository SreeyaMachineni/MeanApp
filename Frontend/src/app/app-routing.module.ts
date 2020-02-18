import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule,ReactiveFormsModule,MatFormFieldModule,CommonModule,MatInputModule,MatCardModule,MatToolbarModule
  ],
  exports: [RouterModule],
  declarations: [LoginComponent]
})
export class AppRoutingModule { }
