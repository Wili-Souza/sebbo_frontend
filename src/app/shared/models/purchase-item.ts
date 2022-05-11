import { Item } from './item';

export interface PurchaseItem {
    id: string,
    quantity: number;
    book: Item;
} 