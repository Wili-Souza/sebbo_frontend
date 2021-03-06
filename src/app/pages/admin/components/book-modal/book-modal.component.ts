import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { BookService } from 'src/app/core/services/book.service';
import { ImageService } from 'src/app/core/services/image.service';
import { LoaderService } from 'src/app/core/services/loader.service';
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
  coverFileName = "";
  bookForm = this.fb.group({
    name: ["", Validators.required],
    author: ["", Validators.required],
    price: ["", Validators.required],
    stock: ["", Validators.required],
    sinopse: ["", Validators.required],
    image: ["", Validators.required],
  });
  icons = {
    close: faTimes
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private fb: FormBuilder,
    private messageServices: MessagesService,
    private imageService: ImageService,
    private loaderService: LoaderService
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
    this.loaderService.start();
    this.bookService.getById(id).subscribe( book => {
      this.imageService.getFileFromUrl(book.image as string)
      .pipe(finalize(() => this.loaderService.stop()))
      .subscribe(
        (bookForm) => {
          this.book = {
            ...book,
            image: bookForm as File
          };
          this.coverFileName = (this.book.image as File).name;
          this.bookForm.patchValue(this.book);
        }
      );
    });
  }

  onClose(){
    this.close({ reload: false });
  }

  close(queryParams: { reload?: boolean } = { reload: true }) {
    this.router.navigate(["/admin"], { queryParams });
  }

  onFileChange(event: any) {
    const file: File = event.target.files[0] as File;
    this.coverFileName = file.name;
    this.bookForm.controls.image.setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    Object.keys(this.bookForm.value).forEach( key => {
      formData.append(key, this.bookForm.value[key])
    })
    
    if ( this.book?.id && this.bookForm.valid ) {
      this.bookService.update(this.book.id, formData).subscribe(
        () => this.close(),
        errorRes => this.messageServices.error(errorRes.error.message)
      );
    } else {
      this.bookService.create(formData).subscribe(
        () => this.close(),
        errorRes => this.messageServices.error(errorRes.error.message)
      );
    }
  }
}
