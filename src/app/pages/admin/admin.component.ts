import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
  icons = {
    close: faPlus,
    delete: faTrashAlt
  }

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

  showCreatePage(): void {
    this.router.navigate(['/admin/create/']);
  }

  remove(item: Item): void {
    const confirmed = confirm("Deseja remover esse item permanentemente?");
    if ( confirmed && item.id ) {
      this.bookService.delete(item.id).subscribe(
        () => this.fetchData(),
        error => console.log(error)
      );
    }
  }
}
