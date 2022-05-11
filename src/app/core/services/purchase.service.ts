import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  // nao testado
  create(userId: string, bookId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/" + bookId + "/purchase";
    return this.http.post<Purchase>(url, {});
  }

  // NAO USADO
  getAll(userId: string): Observable<Purchase[]> {
    const url = this.baseUrl + "user/" + userId + "/purchase";
    return this.http.get<Purchase[]>(url);
  }

  // NAO USADO  
  getById(userId: string, purchaseId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/" + purchaseId;
    return this.http.get<Purchase>(url);
  }

  // Cart

  //  OK
  getCartPurchase(userId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart";
    return this.http.get<Purchase>(url);
  }

  // OK
  addItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add-quantity/";
    console.log(quantity);
    
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

  // OK
  removeItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove-quantity/";
    console.log(quantity);
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

  // OK
  addItem(userId: string, idItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add/";
    const body = { id: idItem };
    return this.http.post<Purchase>(url, body);
  }

  // OK
  removeItem(userId: string, idPurchaseItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove/";
    const body = { id: idPurchaseItem };
    return this.http.post<Purchase>(url, body);
  }

  // nao testado
  confirm(userId: string, purchaseId: string): Observable<any> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/confirm/";
    const body = { id: purchaseId }
    return this.http.post<any>(url, body);
  }
}
