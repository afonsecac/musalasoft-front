import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { PeripheralService } from "app/core/services/peripheral.service";

@Injectable({
    providedIn: 'root'
})
export class PeripheralsResolver implements Resolve<any[]> {
    
    constructor(private _peripheralService: PeripheralService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
        return this._peripheralService.getAllPeripheral();
    }
}
