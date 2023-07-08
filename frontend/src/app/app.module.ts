import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';
import { GuestComponent } from './guest/guest.component';
import { AgencyGuestComponent } from './agency-guest/agency-guest.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertyComponent } from './property/property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { LogoutComponent } from './logout/logout.component';
import { RequestComponent } from './request/request.component';
import { AgencyJobComponent } from './agency-job/agency-job.component';
import { ClientJobComponent } from './client-job/client-job.component';
import { WorkerComponent } from './worker/worker.component';
import { WorkerInfoComponent } from './worker-info/worker-info.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { PropertyInfoComponent } from './property-info/property-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AgencyComponent,
    AdminComponent,
    LoginAdminComponent,
    RegisterComponent,
    GuestComponent,
    AgencyGuestComponent,
    ProfileComponent,
    PropertyComponent,
    AddPropertyComponent,
    LogoutComponent,
    RequestComponent,
    AgencyJobComponent,
    ClientJobComponent,
    WorkerComponent,
    WorkerInfoComponent,
    RegistrationRequestsComponent,
    AdminJobsComponent,
    PropertyInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
