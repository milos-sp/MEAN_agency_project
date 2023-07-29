import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin/login", component: LoginAdminComponent},
  {path: "client", component: UserComponent},
  {path: "agencies/:username", component: AgencyGuestComponent},
  {path: "admin", component: AdminComponent},
  {path: "register", component: RegisterComponent},
  {path: "guest", component: GuestComponent},
  {path: "profile", component: ProfileComponent},
  {path: "agency", component: AgencyComponent},
  {path: "property", component: PropertyComponent},
  {path: "add-property", component: AddPropertyComponent},
  {path: "logout", component: LogoutComponent},
  {path: "request", component: RequestComponent},
  {path: "agency-job", component: AgencyJobComponent},
  {path: "client-job", component: ClientJobComponent},
  {path: "worker", component: WorkerComponent},
  {path: "workers/:id", component: WorkerInfoComponent},
  {path: "profiles/:username", component: ProfileComponent},
  {path: "registration-requests", component: RegistrationRequestsComponent},
  {path: "admin-jobs", component: AdminJobsComponent},
  {path: "add-user", component: RegisterComponent},
  {path: "property-info/:id", component: PropertyInfoComponent},
  {path: "reset-password", component: ResetPasswordComponent},
  {path: "new-password/:email", component: NewPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
