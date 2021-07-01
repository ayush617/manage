import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashRoutingModule } from './dash-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LeadsComponent } from './components/leads/leads.component';
import { UsersComponent } from './components/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
@NgModule({
  imports: [CommonModule,DashRoutingModule],
  declarations: [DashComponent,
                BreadcrumbsComponent,
                TopnavComponent,
                SidenavComponent,
                FooterComponent,
                HomeComponent,
                CompanyComponent,
                LeadsComponent,
                UsersComponent,
                TasksComponent
               ],
  exports: [DashComponent]
})
export class DashModule { }
