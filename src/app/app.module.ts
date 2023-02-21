import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactIndexComponent } from './pages/contact-index/contact-index.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChartComponent } from './cmps/chart/chart.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { ValueChartComponent } from './cmps/value-chart/value-chart.component';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactIndexComponent,
    HomePageComponent,
    ChartComponent,
    StatisticPageComponent,
    AppHeaderComponent,
    ValueChartComponent,
    LoginSignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
