import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin/login", component: LoginAdminComponent},
  {path: "client", component: UserComponent},
  {path: "agency", component: AgencyComponent},
  {path: "admin", component: AdminComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
