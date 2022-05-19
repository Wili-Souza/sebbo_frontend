import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { BookService } from 'src/app/core/services/book.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { Item } from '../../../../shared/models/item';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookModalComponent implements OnInit {
  book?: Item;
  bookId = new Subject<string>();
  bookForm = this.fb.group({
    name: ["", Validators.required],
    author: ["", Validators.required],
    price: ["", Validators.required],
    stock: ["", Validators.required],
    sinopse: ["", Validators.required],
    // cover: ["", Validators.required],
  });
  icons = {
    close: faTimes
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private fb: FormBuilder,
    private messageServices: MessagesService
  ) { }

  ngOnInit(): void {
    this.bookId.subscribe( id => {
      this.fetchBook(id);
    });
    this.activatedRoute.paramMap.subscribe( params => {
      const id = params.get("id");
      if ( id ) this.bookId.next(id);
    })
  }

  fetchBook(id: string) {
    this.bookService.getById(id).subscribe( book => {
      this.book = book;
      this.bookForm.patchValue(book);
    });
  }

  close() {
    this.router.navigate(["/admin"]);
  }

  onSubmit() {
    const book = this.bookForm.value as Item;
    if ( this.book?.id && this.bookForm.valid ) {
      this.bookService.update(this.book.id, book).subscribe(
        () => this.close(),
        errorRes => this.messageServices.error(errorRes.error.message)
      );
    }
  }
}
