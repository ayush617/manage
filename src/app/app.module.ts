import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonService } from './services/common.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Auth } from './login/auth';
import { TopnavComponent } from './dash/components/topnav/topnav.component';
import { SidenavComponent } from './dash/components/sidenav/sidenav.component';
import { HomeComponent } from './dash/components/home/home.component';
import { FooterComponent } from './dash/components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    // DashComponent,
    LoginComponent,
    // TopnavComponent,
    // SidenavComponent,
    // HomeComponent,
    // FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      progressAnimation: "decreasing",
      progressBar: true
    })
  ],
  providers: [CommonService,
              Auth],
  bootstrap: [AppComponent]
})
export class AppModule { }
