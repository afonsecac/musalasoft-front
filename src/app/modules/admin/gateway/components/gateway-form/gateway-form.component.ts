import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject, takeUntil } from "rxjs";

import { GatewayService } from "app/core/services/gateway.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-gateway-form',
    templateUrl: './gateway-form.component.html',
    styleUrls: ['./gateway-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GatewayFormComponent implements OnInit, OnDestroy {
    
    formFieldHelpers: string[] = [''];
    form: FormGroup;
    gateway: any = null;
    
    messageError: string = null;
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _formBuild: FormBuilder,
        private _gatewayService: GatewayService
    ) {
    }
    
    ngOnInit(): void {
        this.form = this._formBuild.group({
            id: [null],
            serialNumber: [null, Validators.required],
            name: [null, Validators.required],
            ipV4: [null, [
                Validators.required,
                Validators.pattern(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)
            ]]
        });
        this._gatewayService.gateway$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((gateway: any) => {
                this.gateway = gateway;
                
                this.form.patchValue(gateway);
            });
        
        this.form.valueChanges.subscribe((changes) => {
            if (changes) {
                this.messageError = null;
            }
        })
    }
    
    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }
    
    save(): void {
        if (this.form.invalid) {
            return;
        }
        
        const params: any = this.form.getRawValue();
        if (!this.gateway) {
            delete params.id;
            this._gatewayService.save(params).subscribe((result: any) => {
                if (result.insertedId) {
                    this.gateway = null;
                    this._router.navigate(['/gateway']).then();
                }
            }, ({ error }: HttpErrorResponse) => {
                this.messageError = error?.message;
            });
        } else {
            this._gatewayService.update(params, this.gateway.id).subscribe((result) => {
                if (result.acknowledged) {
                    this.gateway = null;
                    this._gatewayService._gateway.next(null);
                    this._router.navigate(['/gateway']).then();
                }
            }, ({ error }: HttpErrorResponse) => {
                this.messageError = error?.message;
            });
        }
    }
}
