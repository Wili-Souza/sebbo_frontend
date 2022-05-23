import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.start();

    const jwtToken = localStorage.getItem("jwt_token");
    
    if ( jwtToken ) {
      const reqCloned = request.clone({
        headers: request.headers.set(
          "Authorization", `x-access-token ${jwtToken}`
        )
      })

      return next.handle(reqCloned).pipe( finalize( () => {this.loaderService.stop()} ));
    }

    return next.handle(request).pipe( finalize( () => this.loaderService.stop() ));
  }
}
