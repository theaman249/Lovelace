import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { OfficeBookingsComponent } from "./office-bookings/office-bookings.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from "ngx-cookie";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule( {
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        CookieModule.withOptions(),
        HttpClientModule,
        MatSnackBarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}