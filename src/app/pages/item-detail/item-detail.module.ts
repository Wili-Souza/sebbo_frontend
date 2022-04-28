import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemDetailRoutingModule } from './item-detail-routing.module';
import { ItemDetailComponent } from './item-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ItemDetailComponent
  ],
  imports: [
    CommonModule,
    ItemDetailRoutingModule,
    SharedModule
  ]
})
export class ItemDetailModule { }
