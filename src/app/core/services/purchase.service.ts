import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item';
import { Purchase } from 'src/app/shared/models/purchase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // cria com status pending
  create(userId: string, items: Item[]): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase";
    const body = { items };
    return this.http.post<Purchase>(url, body);
  }

  getAll(userId: string): Observable<Purchase[]> {
    const url = this.baseUrl + "user/" + userId + "/purchase";
    return this.http.get<Purchase[]>(url);
  }

  getById(userId: string, purchaseId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/" + purchaseId;
    return this.http.get<Purchase>(url);
  }

  // Cart

    // get cart purchase 
  getCartPurchase(userId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart";
    return this.http.get<Purchase>(url);
  }

    // add quantity
  addItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add-quantity/";
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

    // remove quantity
  removeItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove-quantity/";
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

    // add item -> adicionar ao carrinho
  addItem(userId: string, idItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add/";
    const body = { id: idItem };
    return this.http.post<Purchase>(url, body);
  }

    // remove item
  removeItem(userId: string, idPurchaseItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove/";
    const body = { id: idPurchaseItem };
    return this.http.post<Purchase>(url, body);
  }

    // confirm car purchase
  confirm(userId: string, purchaseId: string): Observable<any> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/confirm/";
    const body = { id: purchaseId }
    return this.http.get<any>(url);
  }
}
