import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject, takeUntil } from "rxjs";

import { GatewayService } from "app/core/services/gateway.service";
import { PeripheralService } from "app/core/services/peripheral.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-add-peripheral',
    templateUrl: './add-peripheral.component.html',
    styleUrls: ['./add-peripheral.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddPeripheralComponent implements OnInit, OnDestroy {
    
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    
    errorMessage: string = null;
    gateways: any[] = [];
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _gatewayService: GatewayService,
        private _peripheralService: PeripheralService
    ) {
    }
    
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            uid: [null, Validators.required],
            vendor: [null, Validators.required],
            status: ['online'],
            gatewayId: [null, Validators.required]
        });
        
        this._gatewayService.gateways$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((gateways) => {
                this.gateways = gateways;
            });
        
        this.form.valueChanges.subscribe((changes) => {
            if (changes) {
                this.errorMessage = null;
            }
        })
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    
    save(): void {
        if (this.form.invalid) {
            return;
        }
        
        this._peripheralService.save(this.form.getRawValue()).subscribe((result: any) => {
            if (result.insertedId) {
                this._router.navigate(['/peripheral']).then();
            }
        }, ({ error }: HttpErrorResponse) => {
            this.errorMessage = error?.message;
        })
    }
    
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }
}
