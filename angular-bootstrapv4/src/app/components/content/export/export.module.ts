import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExportComponent } from './export.component';

export const exportModuleRoutes: Routes = [
  { path: '', component: ExportComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(exportModuleRoutes),
    CommonModule
  ],
  declarations: [ExportComponent],
  exports: [RouterModule]
})

export class ExportModule { }