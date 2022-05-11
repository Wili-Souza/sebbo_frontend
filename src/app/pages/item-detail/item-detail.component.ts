import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { BookService } from 'src/app/core/services/book.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item?: Item;

  constructor(
    private router: Router,
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.fetchItemData();
  }

  private fetchItemData(): void {
    //TODO: get book as Item from backend
    let id = "";
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get("id")
      if ( id ) {
        this.getById(id);
      } 
    });
  }

  getById(id: string): void  {
    this.bookService.getById(id).subscribe( item => {
      this.item = item;
    }, error => console.log(error));
  }

  addToCart() {
    // TODO: adicionar item ao carrinho 
    // if ( this.authService.isLoggedIn() ) {
    //   this.sendEmail(this.item);
    // } else {
    //   this.router.navigate(["/auth/login"])
    // }
    this.router.navigate(['cart'], { state: { item: this.item } });
  }

  // sendEmail(item?: Item) {
  //   const sebboEmail = "user@example.com";
  //   const subject = "[COMPRA]"
  //   const message = `Olá,%0D%0 %0D%0AAgostaria de comprar o livro ${ item?.name }, de codigo ${ item?.id }.%0D%0A %0D%0AEntre em contato comigo!`
  //     .replace(" ", "%20");
  //   window.location.href = `mailto:${sebboEmail}?subject=${subject}&body=${message}`;
  // }

  goback(): void {
    this.router.navigate(['home']);
  }
}