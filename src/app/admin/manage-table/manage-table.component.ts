import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../utils/api.service';
import { ConstantData } from '../../utils/constant-data';
import { log } from 'console';

@Component({
  selector: 'app-manage-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css'],
  providers: [ApiService]
})
export class ManageTableComponent {
  TableRest: any = {};
  StatusList: any[] = [];
  TableList: any[] = [];

  @ViewChild('myForm') myForm!: NgForm;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getStatusList();
    this.getTableList();
    this.resetForm();
  }

  getStatusList() {
    this.apiService.getStatusList({}).subscribe((res: any) => {
      this.StatusList = res.StatusList || [];
      // console.log("StatusList:", this.StatusList);

      if (!this.TableRest.Status) {
        const active = this.StatusList.find(x => x.Value === 'Active');
        if (active) this.TableRest.Status = active.Key;
      }
    });
  }

  getTableList() {
    this.apiService.getTableList({}).subscribe(
      (res: any) => {
        console.log("getTableList response:", res.message);
        if (res.message === ConstantData.SuccessMessage) {
          this.TableList = res.TableRests;
          console.log("TableList assigned:", res.TableRests);

          this.cdr.detectChanges();
        } else {
          alert(res.Message);
        }
      },
      err => {
        console.error("Error fetching table list", err);
        alert("Error while fetching records");
      }
    );
  }

  saveTable() {
    this.myForm.control.markAllAsTouched();

    if (this.myForm.invalid) {
      alert("Fill all the required fields !!");
      return;
    }

    this.apiService.saveTable(this.TableRest).subscribe(
      (res: any) => {
        if (res.message === ConstantData.SuccessMessage) {
          alert(this.TableRest.TableId ? "Table Updated successfully" : "Table Added successfully");
          this.getTableList();
        } else {
          alert("user alread exist");
        }

      },
      err => {
        console.error("Save error:", err);
        alert("Error occurred while submitting data");
      }
    );
  }

  editTable(obj: any) {
    this.TableRest = { ...obj };
    console.log("Editing:", this.TableRest);
  }

  deleteTable(obj: any) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.apiService.deleteTable(obj).subscribe(
        (res: any) => {
          if (res.message === ConstantData.SuccessMessage) {
            alert("Record deleted successfully");
            this.getTableList();
          } else {
            alert(res.message);
          }
          this.getTableList();
          this. resetForm();
        },
        err => {
          console.error("Delete error:", err);
          alert("Error occurred while deleting the record");
        }
      );
    }
  }

  resetForm() {
    this.TableRest = {};
    if (this.myForm) {
      this.myForm.control.markAsPristine();
      this.myForm.control.markAsUntouched();
    }
  }
}
