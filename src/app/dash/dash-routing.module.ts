import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { CompanyComponent } from './components/company/company.component';
import { HomeComponent } from './components/home/home.component';
import { LeadsComponent } from './components/leads/leads.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UsersComponent } from './components/users/users.component';
import { DashComponent } from './dash.component';


const routes: Routes = [
  { path: '',
    component: DashComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'prefix' },
        { path: 'home',  component: HomeComponent},
        { path: 'leads',  component: LeadsComponent},
        { path: 'company',  component: CompanyComponent},
        { path: 'users',  component: UsersComponent},
        { path: 'tasks',  component: TasksComponent},
        { path: 'attendance',  component: AttendanceComponent}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
