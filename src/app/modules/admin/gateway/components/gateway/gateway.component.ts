import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl } from "@angular/forms";

import { Observable, Subject, takeUntil } from "rxjs";

import { GatewayService } from "app/core/services/gateway.service";
import { fuseAnimations } from "@fuse/animations";
import { PeripheralService } from "app/core/services/peripheral.service";

@Component({
    selector: 'app-gateway',
    templateUrl: './gateway.component.html',
    styleUrls: ['./gateway.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations
})
export class GatewayComponent implements OnInit, OnDestroy {
    
    gateways$: any[];
    filteredGateways$: Observable<any[]>;
    
    isLoading: boolean = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    
    selectedGateway: any;
    size: number = 0;
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _gatewayService: GatewayService,
        private _peripheralService: PeripheralService
    ) { }
    
    ngOnInit(): void {
        this.filteredGateways$ = this._gatewayService.gateways$;
        this.filteredGateways$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((gateways) => {
                this.gateways$ = gateways;
                
                this._changeDetectorRef.markForCheck();
            });
        
        this._peripheralService.peripherals$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((peripherals: any[]) => {
                this.size = peripherals?.length;
                
                this._changeDetectorRef.markForCheck();
            });
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    
    createNewGateway(): void {
    
    }
    
    closeDetails(): void
    {
        this.selectedGateway = null;
    }
    
    toggleDetails(gatewayId: string): void
    {
        // If the product is already selected...
        if ( this.selectedGateway && this.selectedGateway.id === gatewayId)
        {
            this.size = 0;
            // Close the details
            this.closeDetails();
            return;
        }
        
        const index: number = this.gateways$.findIndex((item: any) => item.id.indexOf(gatewayId) === 0);
        if (index >= 0) {
            this.selectedGateway = this.gateways$[index];
            
            this._peripheralService.getAllPeripheral({ gatewayId }).subscribe();
            this._changeDetectorRef.markForCheck();
        }
    }
    
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
    
    
}
