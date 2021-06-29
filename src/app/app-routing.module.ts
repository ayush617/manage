import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { Auth } from './login/auth';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: DashComponent, canActivate: [Auth] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
