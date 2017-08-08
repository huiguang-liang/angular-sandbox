import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';

export const analyticsModuleRoutes: Routes = [
  { path: '', component: AnalyticsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(analyticsModuleRoutes),
    CommonModule
  ],
  declarations: [AnalyticsComponent],
  exports: [RouterModule]
})

export class AnalyticsModule { }