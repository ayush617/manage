import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashComponent } from './dash.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DashComponent],
  exports: [DashComponent]
})
export class DashModule { }
