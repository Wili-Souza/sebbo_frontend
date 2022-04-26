import { Component } from '@angular/core';
import { footerSections } from 'src/assets/data/footer-sections';
import { FooterSection } from './shared/models/footer-section';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  footerSections: FooterSection[] = footerSections;
}
