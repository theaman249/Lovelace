import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { OfficeBookingsComponent } from './office-bookings/office-bookings.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    {
        path: '',
        component:LoginComponent,
        title: 'Login'
    },
    {
        path: 'Home',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'Signup',
        component: SignupComponent,
        title: 'Sign Up'
    },
    {
        path: 'Office',
        component: OfficeBookingsComponent,
        title: 'Office Bookings'
    },
    {
        path: 'Pp',
        component: ProfilePageComponent,
        title: 'Profile Page'
    },
    {
        path: 'Dashboard',
        component: StatisticsComponent,
        title: 'Dashboard'
    },
    {
        path: 'Forgot',
        component: ForgotPasswordComponent,
        title:'Forgot Password'
    }
];


export default routes;
