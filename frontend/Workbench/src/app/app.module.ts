import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { OfficeBookingsComponent } from "./office-bookings/office-bookings.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from "ngx-cookie";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CountUpDirective } from './count-up.directive'; 

@NgModule( {
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        CountUpDirective,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        CookieModule.withOptions(),
        HttpClientModule,
        MatSnackBarModule,
        NgApexchartsModule,
        CountUpModule,
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule{}