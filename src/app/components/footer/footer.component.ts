import { Component, Input, OnInit } from '@angular/core';
import { faAddressCard, faEnvelope, faMapMarkerAlt, faPhoneAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FooterSection } from 'src/app/shared/models/footer-section';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() topElement?: HTMLElement;
  @Input() sections?: FooterSection[];

  icons: { [key: string]: IconDefinition } = {
    phone: faPhoneAlt,
    address: faMapMarkerAlt,
    cnpj: faAddressCard,
    email: faEnvelope
  }

  constructor() { }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    this.topElement?.scrollIntoView({ behavior: "smooth" });
  }
}