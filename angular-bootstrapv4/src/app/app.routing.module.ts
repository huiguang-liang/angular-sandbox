import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: '/overview', pathMatch: 'full' },
      { path: 'overview', loadChildren: 'app/components/content/overview/overview.module#OverviewModule' },
      { path: 'reports', loadChildren: 'app/components/content/reports/reports.module#ReportsModule' },
      { path: 'analytics', loadChildren: 'app/components/content/analytics/analytics.module#AnalyticsModule' },
      { path: 'export', loadChildren: 'app/components/content/export/export.module#ExportModule' },
      { path: 'case-new', loadChildren: 'app/components/content/case-new/case-new.module#CaseNewModule' },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}