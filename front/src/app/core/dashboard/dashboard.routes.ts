import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommentboxComponent } from "./components/workspace/commentbox/commentbox.component";
import { WorkspaceComponent } from "./components/workspace/workspace.component";
import { HomedashComponent } from "./components/homedash/homedash.component";
import { ProfileComponent } from "../auth/components/profile/profile.component";
import { LibraryComponent } from "./components/library/library.component";
import { CreatecommunityComponent } from "./components/workspace/createcommunity/createcommunity.component";
import { TimelineComponent } from "./components/workspace/timeline/timeline.component";

export const DASHBOARD_ROUTES: Routes = [
    { 
        path: '', 
        component: DashboardComponent,
        children: [
            
            { path:'home',component:HomedashComponent } ,
            { path:'profile',component:ProfileComponent } ,
            {path: 'workspace/:workspaceId',component: WorkspaceComponent},
            { path:'library',component:LibraryComponent } ,
            { path:'createcommunity',component:CreatecommunityComponent},
          ],

    },
    
    { path:'timeline',component:TimelineComponent } ,
    { path:'commentbox',component:CommentboxComponent } ,
    //{ path:'workspace/:workspaceId',component:WorkspaceComponent } 
];