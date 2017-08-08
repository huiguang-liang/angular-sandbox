import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { AppRoutingModule } from './app.routing.module';
/*
import { OverviewModule } from './components/content/overview/overview.module';
import { ReportsModule } from './components/content/reports/reports.module';
import { AnalyticsModule } from './components/content/analytics/analytics.module';
import { ExportModule } from './components/content/export/export.module';
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule,
    NavbarModule,
    AppRoutingModule,
    /*
    OverviewModule,
    ReportsModule,
    AnalyticsModule,
    ExportModule
    */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
