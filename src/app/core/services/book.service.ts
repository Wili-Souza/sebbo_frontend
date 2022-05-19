import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Item } from 'src/app/shared/models/item';


const mockCoverUrl = "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private URL = environment.apiUrl + "livro/";

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.URL).pipe(
      map(items => items.map(item => ({ ...item, imageUrl: mockCoverUrl })))
    );
  }

  getById(id: string): Observable<Item> {
    const getBookUrl = this.URL + id;
    return this.http.get<Item>(getBookUrl).pipe(
      map(item => ({ ...item, imageUrl: mockCoverUrl }))
    );
  }

  update(id: string, book: Item): Observable<Item>  {
    const putBookUrl = this.URL + id;
    return this.http.put<Item>(putBookUrl, book).pipe(
      map(item => ({ ...item, imageUrl: mockCoverUrl }))
    );
  }
}
