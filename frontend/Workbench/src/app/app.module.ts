import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { OfficeBookingsComponent } from "./office-bookings/office-bookings.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

const routes: Routes = [
    {path: 'Home', component: HomeComponent},
    {path: '', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'office', component: OfficeBookingsComponent},
    {path: 'profile', component: ProfilePageComponent},
    {path: 'stats', component: StatisticsComponent},
    {path: 'forgot', component: ForgotPasswordComponent},
]

@NgModule( {
    declarations: [
        HomeComponent,
        LoginComponent,
        SignupComponent,
        OfficeBookingsComponent,
        ProfilePageComponent,
        StatisticsComponent,
        ForgotPasswordComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule{}