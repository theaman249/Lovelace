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
//import { AppRoutingModule } from "./app-routing.module";

@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        //AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}