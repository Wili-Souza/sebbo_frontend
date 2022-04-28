import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item?: Item;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchItemData();
  }

  private fetchItemData(): void {
    //TODO: get book as Item from backend
    this.item = {
      id: "1",
      name: "Livro 1",
      author: "José",
      stock: 2,
      description: "",
      price: 19.9,
      imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
    }
  }

  addToCart() {
    // TODO: adicionar item ao carrinho 
  }

  goback(): void {
    this.router.navigate(['home']);
  }
}