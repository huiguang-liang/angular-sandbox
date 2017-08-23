import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics.component';
import { D3graphModule } from '../d3graph/d3graph.module';

export const analyticsModuleRoutes: Routes = [
  { path: '', component: AnalyticsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(analyticsModuleRoutes),
    D3graphModule,
    CommonModule
  ],
  declarations: [AnalyticsComponent],
  exports: [RouterModule]
})

export class AnalyticsModule { }