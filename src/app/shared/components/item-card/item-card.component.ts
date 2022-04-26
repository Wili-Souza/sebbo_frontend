import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Output() showDetails: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() buy: EventEmitter<Item> = new EventEmitter<Item>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowDetails(item: Item): void {
    this.showDetails.emit(item);
  }

  onBuy(item: Item): void {
    this.buy.emit(item);
  }
}