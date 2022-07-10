import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PeripheralService } from "app/core/services/peripheral.service";

@Injectable({
    providedIn: 'root'
})
export class PeripheralsByGatewayResolver implements Resolve<any[]> {
    
    constructor(private _peripheralService: PeripheralService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
        const gatewayId: string = `${route.paramMap.get('id')}`;
        return this._peripheralService.getAllPeripheral({gatewayId});
    }
}
