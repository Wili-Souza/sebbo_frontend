import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessagesService } from 'src/app/core/services/messages.service';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Purchase } from 'src/app/shared/models/purchase';
import { PurchaseItem } from 'src/app/shared/models/purchase-item';
import { Item } from 'src/app/shared/models/item';

import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const mockCoverUrl = "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg";
const productsMock = [
  {
    quantity: 2,
    book: {
      imageUrl: mockCoverUrl,
      name: "Livro 1",
      price: 20.50,
      id: "id123",
      sinopse: "Um livro legal para a galerinha",
      author: "João",
      stock: 4,
    }
  },
  {
    quantity: 1,
    book: {
      imageUrl: mockCoverUrl,
      name: "Livro 2",
      price: 10.50,
      id: "id123",
      sinopse: "Um livro legal para a galerinha",
      author: "João",
      stock: 3,
    }
  }
];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId?: string;
  purchase!: Purchase;
  products?: PurchaseItem[];

  icons = {
    add: faPlus,
    subtract: faMinus,
    remove: faTrashAlt
  }

  public get totalValue(): number {
    if ( this.products ) {
      return this.products.reduce(function (prev, product) { 
        return prev + (product.quantity * product.book.price); 
      }, 0);
    }
    return 0;
  }
  
  constructor(
    private location: Location,
    private purchaseService: PurchaseService,
    private sessionService: SessionService,
    private messagesService: MessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listenUserChanges();
  }

  listenUserChanges() {
    this.sessionService.user.subscribe( user => {
      this.userId = user?.id;
      this.fetchProductsAndAddnew();
    })
  }

  fetchProductsAndAddnew() {
    if ( this.userId ) {
      console.log("fetching and adding new");
      
      this.purchaseService.getCartPurchase(this.userId).subscribe( purchase => {
        console.log("gotpurchase:", purchase);
        this.purchase = purchase || undefined;
        this.products = this.mapProducts(purchase);
        console.log(this.products);
        
        this.addItemIfPassed();
      }, error => console.log(error));
    }
  }

  private mapProducts(purchase: Purchase) {
    if ( purchase ) {
      return this.products = purchase.items.map( item => {
        return {
          ...item,
          book: {
            ...item.book,
            imageUrl: mockCoverUrl
          }
        }
      });
    }
    return undefined;
  }

  fetchProducts() {
    if ( this.userId ) {
      this.purchaseService.getCartPurchase(this.userId).subscribe( purchase => {
        this.purchase = purchase || undefined;
        this.products = this.mapProducts(purchase);
        console.log(this.products);
      }, error => console.log(error));
    }
  }

  getProducts() {

  }

  addItemIfPassed() {
    this.activatedRoute.paramMap.subscribe(() => {
      const item = window.history.state.item;
      if (item) {
        if ( this.purchase ) {
          console.log("purchase exists, adding item...");
          this.addItem(item);
        } else if ( this.userId && item.id ) {
          console.log("creating new purchase");
          
          this.createPurchase(this.userId, item);
        }
      }
    });
  }

  createPurchase(userId: string, item: Item) {
    this.purchaseService.create(userId, item.id || "").subscribe(purchase => {
      console.log("created purchase: ", purchase);
      this.purchase = purchase;
      this.addItem(item);
    })
  }

  removeItem(item: Item): void {
    this.cartItem(item, "removeItem");
  }

  addItem(item: Item): void {
    this.cartItem(item, "addItem");
    this.fetchProducts();
  }

  subtractItem(purchaseItem: PurchaseItem): void {
    console.log(purchaseItem);
    
    this.cartItemQuantity(purchaseItem, "removeItemQuantity", 1);
  }

  sumItem(purchaseItem: PurchaseItem): void {
    console.log(purchaseItem);
    this.cartItemQuantity(purchaseItem, "addItemQuantity", 1);
  }

  confirm(): void {
    if ( this.userId ) {
      this.purchaseService.confirm(this.userId, this.purchase.id).subscribe( () => {
        this.messagesService.success("Compra finalizada com sucesso.");
        this.router.navigate(["/home"]);
      }, error => {
        this.messagesService.fromStatus(error);
      })
    }
  }

  goback(): void {
    this.location.back();
  }

  private cartItem(item: Item, method: "removeItem" | "addItem"): void {
    if ( this.userId && item.id) {
      this.purchaseService[method](this.userId, item.id).subscribe( 
        () => { this.fetchProducts() }, 
        error => { this.messagesService.fromStatus(error) })
    }
  }
  
  private cartItemQuantity(purchaseItem: PurchaseItem, method: "removeItemQuantity" | "addItemQuantity", quantity: number): void {
    const purchaseItemId = purchaseItem.id;
    if ( this.userId && purchaseItemId) {
      this.purchaseService[method](this.userId, purchaseItemId, quantity).subscribe((res) => {
        this.fetchProducts();
      }, error => {
        this.messagesService.fromStatus(error);
      })
    }
  }
}
