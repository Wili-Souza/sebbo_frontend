import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ItemCardComponent,
    SectionTitleComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    FontAwesomeModule,
    FooterComponent,
    ItemCardComponent,
    SectionTitleComponent,
  ]
})
export class SharedModule { }
