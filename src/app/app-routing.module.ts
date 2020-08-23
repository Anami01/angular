import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.AuthModule).catch(error => console.error(error)),
  },
  {
    path: 'dashboard',
    // component: DashboardComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule).catch(error => console.error(error)),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
