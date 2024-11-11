import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { Register1Component } from "./components/register/register1/register1.component";
import { Register2Component } from "./components/register/register2/register2.component";
import { Register3Component } from "./components/register/register3/register3.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ResetPswd1Component } from "./components/reset-pswd/reset-pswd1/reset-pswd1.component";
import { ResetPswd2Component } from "./components/reset-pswd/reset-pswd2/reset-pswd2.component";
import { notLoginGuard } from "./guards/notLogin.guard";
import { notExitGuard } from "./guards/not-exit.guard";
import { registerGuard } from "./guards/register.guard";
import { loginGuard } from "./guards/login.guard";

export const AUTH_ROUTES: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [notLoginGuard] },
    { path: 'register1', component: Register1Component, canActivate: [notLoginGuard] },
    { path: 'register2', component: Register2Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard]},
    { path: 'register3', component: Register3Component, canActivate: [registerGuard, notLoginGuard], canDeactivate: [notExitGuard]},
    { path: 'profile', component: ProfileComponent, canActivate: [loginGuard] },
    { path:'resetPswd1', component: ResetPswd1Component }, 
    { path:'resetPswd2/:tokenPswd', component: ResetPswd2Component }, 
];