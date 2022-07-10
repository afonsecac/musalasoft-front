import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";

@Injectable()
export class MusalaSoftInterceptor implements HttpInterceptor {

  private static baseUrl = (url: string) : string => environment.baseUrl + url;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let modifiedRequest = request.clone();
    if (request.url.indexOf('assets') < 0) {
      modifiedRequest = request.clone({
        url: MusalaSoftInterceptor.baseUrl(request.url)
      });
    }
    return next.handle(modifiedRequest);
  }
}
