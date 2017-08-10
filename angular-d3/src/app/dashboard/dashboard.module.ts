import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
//import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
//import {MultiselectDropdownModule} from './dropdown-multiselect/multiselect-dropdown';
//import { PagerService } from './_services/index';

@NgModule({
  imports: [
    RouterModule.forChild(MODULE_ROUTES), 
    BrowserModule,
    FormsModule,
    //NgxMyDatePickerModule,
    //MultiselectDropdownModule,
  ],
  declarations: [
    MODULE_COMPONENTS,
    // PageComponent
  ],
  providers: [
    //PagerService
  ]
})

export class DashboardModule { }
