import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { ManageTableComponent } from './admin/manage-table/manage-table.component';


export const routes: Routes = [
     { path: "", redirectTo: "/admin/admin-dashboard", pathMatch: "full" }, // default route
     {
       path: "admin",
       component: AdminMasterComponent, // master layout
       children: [
         { path: "admin-dashboard", component: AdminDashboardComponent },
         { path: "manage-category", component: ManageCategoryComponent },
         { path: "admin-about", component: AdminAboutComponent },
         { path: "manage-table", component: ManageTableComponent },
       ],
     },
   ];
   
