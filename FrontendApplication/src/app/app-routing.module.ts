import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleAuthGuard } from './shared/role-auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login' , component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'user', 
    loadChildren : ()=>import('./user/user.module').then(m=>m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren : ()=>import('./admin/admin.module').then(m=>m.AdminModule),
    canActivate: [AuthGuard, RoleAuthGuard]
  },
  {
    path:'**', component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
