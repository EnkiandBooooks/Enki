import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommentboxComponent } from "./components/workspace/commentbox/commentbox.component";


export const DASHBOARD_ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    { path:'commentbox',component:CommentboxComponent } 
];