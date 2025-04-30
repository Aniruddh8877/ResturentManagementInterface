import { Component, NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule, } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/api.service';
import { log } from 'console';
import { ConstantData } from '../../utils/constant-data';


@Component({
  selector: 'app-manage-category',
  //standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css',
  providers: [ApiService],
})
export class ManageCategoryComponent {
  Category: any = {};
  StatusList: any[] = [];
  CategoryList: any = [];
  @ViewChild('myForm') myForm!: NgForm;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getStatusList();
    this.getCategoryList();
    this.resetForm();
  }

  getStatusList() {
    var Object = {}
    this.apiService.getStatusList(Object).subscribe((res: any) => {
      this.StatusList = res.StatusList;
      console.log(res.StatusList);
      if (!this.Category.Status) {
        const activeStatus = this.StatusList.find(x => x.Value === 'Active');
        if (activeStatus) {
          this.Category.Status = activeStatus.Key;
        }
      }


    })
  }

  saveCategory() {
    this.myForm.control.markAllAsTouched();
    if (this.myForm.invalid) {
      alert("Fill all the required fields !!")
      return
    }
    this.apiService.saveCategory(this.Category).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Category.CategoryId > 0) {
          alert("Category Updated successfully")
        } else {
          alert("Category Add successfully")
        }
        this.resetForm();
        this.getCategoryList()
      } else {
        alert(response.Message)
      }
    }, (err => {
      alert("Error occured while submitting data")
    }))
  }

  getCategoryList() {
    var obj = {}

    this.apiService.getCategoryList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.CategoryList = response.CategoryList;
      } else {
        alert(response.Message)
      }

    }, (err => {
      alert("Error while fetching records")

    }))
  }


  deleteCategory(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {
      this.apiService.deleteCategory(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          alert("Record Deleted successfully")
        } else {
          alert(response.Message)

        }
        this.getCategoryList();
      }, (err => {
        alert("Error occured while deleteing the recored")

      }))
    }
  }

  editCategory(obj: any) {
    this.resetForm();
    this.Category = obj;
  }

  resetForm() {
    this.Category = {};
    if (this.myForm) {
      this.myForm.control.markAsPristine();
      this.myForm.control.markAsUntouched();
    }
  }











}
