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
    return this.http.get<Item[]>(this.URL);
  }

  getById(id: string): Observable<Item> {
    const getBookUrl = this.URL + id;
    return this.http.get<Item>(getBookUrl);
  }

  update(id: string, bookFormData: FormData): Observable<Item>  {
    const putBookUrl = this.URL + id;
    return this.http.put<Item>(putBookUrl, bookFormData);
  }

  create(bookFormData: FormData): Observable<Item>  {
    const postBookUrl = this.URL;
    return this.http.post<Item>(postBookUrl, bookFormData);
  }

  delete(id: string): Observable<Item>  {
    const deleteBookUrl = this.URL + id;
    return this.http.delete<Item>(deleteBookUrl);
  }
}
