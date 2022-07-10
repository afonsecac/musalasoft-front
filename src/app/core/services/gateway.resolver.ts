import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GatewayService } from "app/core/services/gateway.service";

@Injectable({
    providedIn: 'root'
})
export class GatewayResolver implements Resolve<any> {
    
    constructor(private _gatewayService: GatewayService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._gatewayService.getGateway(`${route.paramMap.get('id')}`);
    }
}
