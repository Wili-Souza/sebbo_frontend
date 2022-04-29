import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.bookService.getAll().subscribe(books => {
      this.items = books;
    }, error => console.log(error));
  }

  goToItemDetails(item: Item): void {
    this.router.navigate(['item/' + item.id]);
  }

  buyItem(item: Item) {
    // TODO: implement cart functionality
    this.router.navigate(['cart']);
  }
}
