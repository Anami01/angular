import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule {
}
