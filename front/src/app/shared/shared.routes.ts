import { Routes } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PolicyComponent } from "./components/footer/policy/policy.component";

export const SHARED_ROUTES: Routes = [
    { path: 'header', component: HeaderComponent }, 
    { path: 'footer', component: FooterComponent },
    { path: 'policy', component: PolicyComponent },
];