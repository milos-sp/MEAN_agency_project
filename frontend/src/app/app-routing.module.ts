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
  {path: "add-property", component: AddPropertyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
