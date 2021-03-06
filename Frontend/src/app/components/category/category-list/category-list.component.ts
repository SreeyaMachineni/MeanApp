import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../category/category.service';
import { Category } from '../../category/category';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {
  category: any;
  deleteCategoryId: any;
  categories: any;
  action: String;
  categoryForm: FormGroup;
  categoryId: any;
  display: String;
  displayedColumns: string[] = ['name', 'details', 'actions'];
  dataSource: MatTableDataSource<Category>;
  expandedElement: Category | null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, 
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.category = new Category();
    this.categories = new Category();
    this.initForm('add');
    this.fetchCategories();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveit(categoryForm, categoryId) {
    this.action = this.categoryService.action;
    this.categories.name = this.categoryForm.value.name;
    this.categories.details = this.categoryForm.value.details;
    if (this.action == 'add') {
      this.categoryService.addCategory(this.categories).subscribe(
        (category) => {
          this._snackBar.open('Category added successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
          this.fetchCategories();
        },
        (err) => this._snackBar.open('Error while adding Category', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      )
    }
    else {
      this.categoryService.editCategory(this.categoryService.categoryId, this.categories).subscribe(
        (success) => {
          this._snackBar.open('Category updated successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] });
          this.fetchCategories();
          this.display = 'none';
        },
        (err) => this._snackBar.open('Error while updating Category', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      )
    }
  }

  initForm(action) {
    this.action = action;
    if (action == 'add') {
      this.categoryForm = new FormGroup({
        name: new FormControl(''),
        details: new FormControl('')
      });
    }
    else {
      this.categories = this.categoryService.getCategory();
      this.categoryForm = new FormGroup({
        name: new FormControl(this.categories.name),
        details: new FormControl(this.categories.details)
      });

    }
  }

  fetchCategories() {
    this.categoryService.fetchCategories().subscribe(
      (categories) => {
        this.category = categories;
        this.dataSource = new MatTableDataSource(this.category);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => this._snackBar.open('Error while fetching Categories', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
    )
  }

  deleteCategory(categoryId) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (success) => {
        this.fetchCategories();
        //this.router.navigate(['/home/insCategories'])
      },
      (err) => this._snackBar.open('Error while deleting Category', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
    )
  }

  editCategory(categoryId, category) {
    this.categoryService.setCategory(category);
    this.categoryService.setcategoryId(categoryId);
    this.categoryService.setAction('edit');
    this.initForm('edit');
  }

  addCategory() {
    this.categoryService.setAction('add');
    this.initForm('add');
  }

  setDeleteCategoryId(categoryId, e) {
    this.deleteCategoryId = categoryId;
  }


}
