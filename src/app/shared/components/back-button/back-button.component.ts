import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Output() goBack = new EventEmitter<void>();
  back = faArrowAltCircleLeft;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.goBack.emit();
  }
}