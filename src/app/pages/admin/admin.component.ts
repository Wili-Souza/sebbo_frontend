import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { BookService } from 'src/app/core/services/book.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild("outlet") outlet!: RouterOutlet;
  items: Item[] = [];

  constructor(
    private router: Router,
    private bookService: BookService,
  ) { 
    this.fetchWhenLoaded();
  }

  private fetchWhenLoaded() {
    this.router.events.subscribe((val) => {
      if ( val instanceof NavigationEnd && val.url === "/admin") {
        this.fetchData();
      }
    })
  }

  ngOnInit(): void {
  }

  fetchData() {
    this.bookService.getAll().subscribe(books => {
      this.items = books;
    }, error => console.log(error));
  }

  goToItemDetails(item: Item): void {
    this.router.navigate(['item/' + item.id]);
  }

  showEditPage(item: Item): void {
    this.router.navigate(['/admin/edit/' + item.id]);
  }

  buyItem(item: Item) {
    if ( item.stock === 0 ) {
      alert("Item fora de estoque");
    } else {
      this.router.navigate(['cart'], { state: { item: item } });
    }
  }
}
