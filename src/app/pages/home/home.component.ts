import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/models/item';

const booksMock = [
  {
    id: "1",
    name: "Livro 1",
    description: "",
    author: "José",
    stock: 2,
    price: 19.9,
    imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
  },
  {
    id: "2",
    name: "Livro 1",
    author: "José",
    stock: 2,
    description: "",
    price: 19.9,
    imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
  },
  {
    id: "3",
    name: "Livro 1",
    author: "José",
    stock: 2,
    description: "",
    price: 19.9,
    imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
  },
  {
    id: "3",
    name: "Livro 1",
    author: "José",
    stock: 2,
    description: "",
    price: 19.9,
    imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
  },
  {
    id: "3",
    name: "Livro 1",
    author: "José",
    stock: 2,
    description: "",
    price: 19.9,
    imageUrl: "https://ludis.com.br/wp-content/uploads/2020/05/book-img2.jpg"
  }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.items = booksMock;
  }

  goToItemDetails(item: Item): void {
    this.router.navigate(['item/' + item.id])
  }
}
