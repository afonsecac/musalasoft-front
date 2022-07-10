import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { GatewayService } from "app/core/services/gateway.service";

@Injectable({
  providedIn: 'root'
})
export class GatewaysResolver implements Resolve<any[]> {

  constructor(private gatewayService: GatewayService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.gatewayService.getAllGateways();
  }
}
