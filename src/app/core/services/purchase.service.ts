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

  create(userId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase";
    return this.http.post<Purchase>(url, {});
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

  getCartPurchase(userId: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart";
    return this.http.get<Purchase>(url);
  }

  addItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add-quantity/";
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

  removeItemQuantity(userId: string, itemId: string, quantity: number): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove-quantity/";
    const body = { id: itemId, quantity };
    return this.http.post<Purchase>(url, body);
  }

  addItem(userId: string, idItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/add/";
    const body = { id: idItem };
    return this.http.post<Purchase>(url, body);
  }

  removeItem(userId: string, idPurchaseItem: string): Observable<Purchase> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/remove/";
    const body = { id: idPurchaseItem };
    return this.http.post<Purchase>(url, body);
  }

  confirm(userId: string, purchaseId: string): Observable<any> {
    const url = this.baseUrl + "user/" + userId + "/purchase/cart/confirm/";
    const body = { id: purchaseId }
    return this.http.post<any>(url, body);
  }
}
