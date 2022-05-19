import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
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
    private bookService: BookService,
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
    if ( item.stock === 0 ) {
      alert("Item fora de estoque");
    } else {
      this.router.navigate(['cart'], { state: { item: item } });
    }
  }

  // private sendEmail(item: Item) {
  //   const sebboEmail = "user@example.com";
  //   const subject = "[COMPRA]"
  //   const message = `Olá,%0D%0 %0D%0AAgostaria de comprar o livro ${ item.name }, de codigo ${ item.id }.%0D%0A %0D%0AEntre em contato comigo!`
  //     .replace(" ", "%20");
  //   window.location.href = `mailto:${sebboEmail}?subject=${subject}&body=${message}`;
  // }
}
