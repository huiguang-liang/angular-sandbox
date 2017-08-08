import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview.component';

export const overviewModuleRoutes: Routes = [
  { path: '', component: OverviewComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(overviewModuleRoutes),
    CommonModule
  ],
  declarations: [OverviewComponent],
  exports: [RouterModule]
})

export class OverviewModule { }