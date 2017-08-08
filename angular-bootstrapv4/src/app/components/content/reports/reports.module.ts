import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

export const reportsModuleRoutes: Routes = [
  { path: '', component: ReportsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(reportsModuleRoutes),
    CommonModule
  ],
  declarations: [ReportsComponent],
  exports: [RouterModule]
})

export class ReportsModule { }