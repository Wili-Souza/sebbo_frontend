import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem("jwt_token");
    
    if ( jwtToken ) {
      const reqCloned = request.clone({
        headers: request.headers.set(
          "Authorization", `Bearer ${jwtToken}`
        )
      })

      return next.handle(reqCloned);
    }

    return next.handle(request);
  }
}
