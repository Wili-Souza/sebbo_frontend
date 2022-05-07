import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faMinus, faPlus, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/core/services/messages.service';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { SessionService } from 'src/app/core/services/session.service';
import { Purchase } from 'src/app/shared/models/purchase';
import { PurchaseItem } from 'src/app/shared/models/purchase-item';

const mockCoverUrl = "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId?: string;
  purchase!: Purchase;
  products: PurchaseItem[] = [
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

  icons = {
    add: faPlus,
    subtract: faMinus,
    remove: faTrashAlt
  }

  
  public get totalValue(): number {
    return this.products.reduce(function (prev, product) { 
      return prev + (product.quantity * product.book.price); 
    }, 0);
  }
  

  constructor(
    private location: Location,
    private purchaseService: PurchaseService,
    private sessionService: SessionService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.listenUserChanges();
  }

  listenUserChanges() {
    this.sessionService.user.subscribe( user => {
      this.userId = user?.id;
    })
  }

  fetchProducts() {
    if ( this.userId ) {
      this.purchaseService.getCartPurchase(this.userId).subscribe( purchase => {
        this.purchase = purchase;
        this.products = purchase.items;
      })
    }
  }

  removeItem(purchaseItem: PurchaseItem): void {
    if ( this.userId && purchaseItem.book.id) {
      const bookId = purchaseItem.book.id;
      this.purchaseService.removeItem(this.userId, bookId).subscribe( () => {
        purchaseItem.quantity--;
      }, error => {
        this.messagesService.fromStatus(error);
      })
    }
  }

  subtractItem(purchaseItem: PurchaseItem): void {
    if ( this.userId && purchaseItem.book.id) {
      const bookId = purchaseItem.book.id;
      this.purchaseService.removeItemQuantity(this.userId, bookId, 1).subscribe( () => {
        purchaseItem.quantity--;
      }, error => {
        this.messagesService.fromStatus(error);
      })
    }
  }

  addItem(purchaseItem: PurchaseItem): void {
    if ( this.userId && purchaseItem.book.id) {
      const bookId = purchaseItem.book.id;
      this.purchaseService.addItemQuantity(this.userId, bookId, 1).subscribe( () => {
        purchaseItem.quantity--;
      }, error => {
        this.messagesService.fromStatus(error);
      })
    }
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
}
