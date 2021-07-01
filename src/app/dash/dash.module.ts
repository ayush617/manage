import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DashComponent,
                TopnavComponent,
                SidenavComponent,
                HomeComponent,
                FooterComponent
               ],
  exports: [DashComponent]
})
export class DashModule { }
