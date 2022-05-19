import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item!: Item;
  @Input() actionName: string = "Comprar";
  @Output() showDetails: EventEmitter<Item> = new EventEmitter<Item>();
  @Output() action: EventEmitter<Item> = new EventEmitter<Item>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowDetails(item: Item): void {
    this.showDetails.emit(item);
  }

  onBuy(item: Item): void {
    this.action.emit(item);
  }
}