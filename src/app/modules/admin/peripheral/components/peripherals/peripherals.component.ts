import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormControl } from "@angular/forms";

import { Observable, Subject, takeUntil } from "rxjs";

import { GatewayService } from 'app/core/services/gateway.service';
import { PeripheralService } from 'app/core/services/peripheral.service';

@Component({
    selector: 'app-peripherals',
    templateUrl: './peripherals.component.html',
    styleUrls: ['./peripherals.component.scss']
})
export class PeripheralsComponent implements OnInit, OnDestroy {
    
    peripherals$: any[];
    filteredPeripherals$: Observable<any[]>;
    
    isLoading: boolean = false;
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    
    selectedPeripheral: any;
    gateway: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _gatewayService: GatewayService,
        private _peripheralService: PeripheralService
    ) {
    }
    
    ngOnInit(): void {
        this.filteredPeripherals$ = this._peripheralService.peripherals$;
        
        this.filteredPeripherals$.pipe(takeUntil(this._unsubscribeAll)).subscribe((peripherals: any[]) => {
            this.peripherals$ = peripherals;
            
            this._changeDetectorRef.markForCheck();
        })
        
        
        this._gatewayService.gateway$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((gateway: any) => {
                this.gateway = gateway;
                
                this._changeDetectorRef.markForCheck();
            });
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    
    createNewGateway(): void {
    
    }
    
    closeDetails(): void {
        this.selectedPeripheral = null;
        this.gateway = null;
    }
    
    toggleDetails(peripheralId: string): void {
        // If the product is already selected...
        if (this.selectedPeripheral && this.selectedPeripheral.id === peripheralId) {
            // Close the details
            this.closeDetails();
            return;
        }
        
        const index: number = this.peripherals$.findIndex((item: any) => item.id.indexOf(peripheralId) === 0);
        if (index >= 0) {
            this.selectedPeripheral = this.peripherals$[index];
            
            this._gatewayService.getGateway(this.selectedPeripheral.gatewayId).subscribe();
            this._changeDetectorRef.markForCheck();
        }
    }
    
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
}
