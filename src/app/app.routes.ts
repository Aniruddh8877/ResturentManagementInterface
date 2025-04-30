import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './admin/manage-category/manage-category.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
     { path: "", redirectTo: "/admin/admin-dashboard", pathMatch: "full" }, // default route
     {
       path: "admin",
       component: AdminMasterComponent, // master layout
       children: [
         { path: "admin-dashboard", component: AdminDashboardComponent },
         { path: "manage-category", component: ManageCategoryComponent },
       ],
     },
   ];
   
