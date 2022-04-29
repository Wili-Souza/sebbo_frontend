import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
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
  }

  goback(): void {
    this.router.navigate(['home']);
  }
}