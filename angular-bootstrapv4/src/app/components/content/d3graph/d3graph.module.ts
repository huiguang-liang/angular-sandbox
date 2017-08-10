import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3graphComponent } from './d3graph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [D3graphComponent],
  exports: [D3graphComponent]
})

export class D3graphModule { }