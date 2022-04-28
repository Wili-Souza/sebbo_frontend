import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Item } from 'src/app/shared/models/item';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.URL).pipe(
      map(items => items.map(item => ({ ...item, imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg" })))
    );
  }
}
