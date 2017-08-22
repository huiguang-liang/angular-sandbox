import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaseNewComponent } from './case-new.component';

export const caseNewModuleRoutes: Routes = [
  { path: '', component: CaseNewComponent }
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(caseNewModuleRoutes),
    CommonModule
  ],
  declarations: [CaseNewComponent],
  exports: [RouterModule]
})

export class CaseNewModule { }