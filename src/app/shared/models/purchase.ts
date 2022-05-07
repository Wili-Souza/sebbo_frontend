import { Item } from "./item";
import { PurchaseItem } from "./purchase-item";
import { User } from "./user"

export interface Purchase {
    status: string;
    value: number;
    buyer: User;
    items: PurchaseItem[]
}