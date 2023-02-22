import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { ChartComponent } from './cmps/chart/chart.component';
import { ValueChartComponent } from './cmps/value-chart/value-chart.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactResolver } from './services/contact.resolver';
// import { UserResolver } from './services/user.resolver';

const routes: Routes = [
  { path: 'contact/edit', component: ContactEditComponent },
    
  { path: '', redirectTo: 'signup', pathMatch: 'prefix' },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    // canActivate: [AuthGuard],
    resolve: { contact: ContactResolver }
  },

  {
    path: 'stats', component: StatisticPageComponent,
    children: [
      { path: 'avg', component: ChartComponent },
      { path: 'value', component: ValueChartComponent }
    ]
  },
  {
    path: 'home', component: HomePageComponent,
    // resolve: { user: UserResolver }
  },
  { path: 'signup', component: LoginSignupComponent },
  {
    path: 'contact', component: ContactIndexComponent,
    children: [
      // { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: ContactResolver } },
      // { path: 'edit', component: ContactEditComponent }
      {
        path: 'edit/:id', component: ContactEditComponent,
        resolve: { contact: ContactResolver }
    },
   
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment?.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
