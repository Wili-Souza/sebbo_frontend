import { PurchaseItem } from "./purchase-item";
import { User } from "./user"

export interface Purchase {
    id: string;
    created_at: Date;
    status: string;
    value: number;
    buyer: User;
    items: PurchaseItem[]
}