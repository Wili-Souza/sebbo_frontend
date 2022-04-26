import { Component, Input, OnInit } from '@angular/core';
import { FooterSection } from '../../models/footer-section';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() topElement?: HTMLElement;
  @Input() sections?: FooterSection[];

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    this.topElement?.scrollIntoView({ behavior: "smooth" });
  }
}