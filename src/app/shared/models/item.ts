import { Form } from "@angular/forms";

export interface Item {
    image: string | File;
    name: string;
    price: number;
    id?: string;
    sinopse: string;
    author: string;
    stock: number;
} 