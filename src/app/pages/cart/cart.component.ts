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
import { Subject } from 'rxjs';
import { finalize, first, tap } from 'rxjs/operators';

const mockCoverUrl = "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg";
// const productsMock = [
//   {
//     quantity: 2,
//     book: {
//       image: mockCoverUrl,
//       name: "Livro 1",
//       price: 20.50,
//       id: "id123",
//       sinopse: "Um livro legal para a galerinha",
//       author: "João",
//       stock: 4,
//     }
//   },
//   {
//     quantity: 1,
//     book: {
//       image: mockCoverUrl,
//       name: "Livro 2",
//       price: 10.50,
//       id: "id123",
//       sinopse: "Um livro legal para a galerinha",
//       author: "João",
//       stock: 3,
//     }
//   }
// ];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  routeStateValue: Subject<{item: Item}> = new Subject<{item: Item}>();
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
  ) { }

  ngOnInit(): void {
    this.listenUserChanges();
    this.routeStateValue.subscribe( ( routeState => {
      this.addItem(routeState.item);
    }));
  }

  private getRouteState() {
    const item = window.history.state.item;
    if (item && this.purchase) {
      window.history.state.item = undefined;
      this.routeStateValue.next({ item });
    }
  }

  private listenUserChanges() {
    this.sessionService.user
      .pipe(first())
      .subscribe( user => {
        this.userId = user?.id;
        if ( this.userId ) {
          this.fetchProducts();
        }  
      })
  }

  private fetchProducts() {
    if ( this.userId ) {
      this.purchaseService.getCartPurchase(this.userId)
      .pipe( finalize( () => this.getRouteState()) )
      .subscribe( 
        purchase => {
          this.purchase = purchase || undefined;
          this.products = this.mapProducts(purchase);
        }, 
        error => {
          if ( error.status === 404 && this.userId) {
            this.createPurchase(this.userId || "");
          }
        }
      );
    }
  }

  private mapProducts(purchase: Purchase) {
    if ( purchase ) {
      return this.products = purchase.items.map( item => {
        return {
          ...item,
          book: {
            ...item.book,
            image: mockCoverUrl
          }
        }
      });
    }
    return undefined;
  }

  createPurchase(userId: string) {
    this.purchaseService.create(userId).subscribe(purchase => {
      this.purchase = purchase;
      this.fetchProducts();  
    })
  }

  removeItem(item: Item): void {
    this.cartItem(item, "removeItem");
  }

  addItem(item: Item): void {
    this.cartItem(item, "addItem");
  }

  subtractItem(purchaseItem: PurchaseItem): void {
    this.cartItemQuantity(purchaseItem, "removeItemQuantity", 1);
  }

  sumItem(purchaseItem: PurchaseItem): void {
    this.cartItemQuantity(purchaseItem, "addItemQuantity", 1);
  }

  confirm(): void {
    if ( this.userId && this.products && this.products?.length > 0) {
      this.purchaseService.confirm(this.userId, this.purchase.id).subscribe( () => {
        this.sendEmailWithCart();
        this.messagesService.success("Compra finalizada com sucesso.");
        this.router.navigate(["/home"]);
      }, error => {
        this.messagesService.fromStatus(error);
      })
    } else if ( this.products && this.products.length === 0 ) {
      alert("Nenhum item no carrinho!");  
    }
  }

  private sendEmailWithCart() {
    let itemsList = "";
    this.products?.forEach( product => {
      itemsList += `${product.book.name} (${product.book.id}) | quantidade: ${product.quantity}%0D`;
    });
    const sebboEmail = "user@example.com";
    const subject = "[COMPRA]"
    const message = `Olá, %0D %0DEu gostaria de comprar os livros: %0D${ itemsList }%0DEntre em contato comigo!`
      .replace(" ", "%20");
    window.location.href = `mailto:${sebboEmail}?subject=${subject}&body=${message}`;
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
      this.purchaseService[method](this.userId, purchaseItemId, quantity).subscribe(
        () => { this.fetchProducts() }, 
        error => { this.messagesService.fromStatus(error) })
    }
  }
}
