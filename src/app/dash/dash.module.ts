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
import { MatFormField, MatFormFieldModule, MatInputModule, MatOption, MatPaginatorModule, MatRippleModule, MatSelect, MatSlider, MatSlideToggle, MatTableModule } from '@angular/material';
import { CreatecompanyComponent } from './popup/createcompany/createcompany.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CreateleadComponent } from './popup/createlead/createlead.component';
import { CreateuserComponent } from './popup/createuser/createuser.component';
import { CreatetaskComponent } from './popup/createtask/createtask.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
@NgModule({
  imports: [CommonModule,
            FormsModule,
            DashRoutingModule,
            MatTableModule,
            MatPaginatorModule,
            NgbModalModule,
            MatRippleModule,
            MatFormFieldModule,
            MatInputModule,
          ],
  declarations: [DashComponent,
                BreadcrumbsComponent,
                TopnavComponent,
                SidenavComponent,
                FooterComponent,
                HomeComponent,
                CompanyComponent,
                LeadsComponent,
                UsersComponent,
                TasksComponent,
                AttendanceComponent,
                CreatecompanyComponent,
                CreateleadComponent,
                CreateuserComponent,
                CreatetaskComponent,
                MatSlideToggle,
                MatSlider
               ],
  exports: [DashComponent],
  entryComponents: [CreatecompanyComponent,
                    CreateleadComponent,
                    CreateuserComponent,
                    CreatetaskComponent]
})
export class DashModule { }
