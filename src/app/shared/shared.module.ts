import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ItemCardComponent } from './components/item-card/item-card.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    ItemCardComponent,
    SectionTitleComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FontAwesomeModule,
    ItemCardComponent,
    SectionTitleComponent,
    BackButtonComponent,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
