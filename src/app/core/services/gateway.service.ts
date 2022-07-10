import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GatewayService {
    
    private _gateways: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    _gateway: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    
    constructor(private http: HttpClient) {
    }
    
    
    get gateways$(): Observable<any[]> {
        return this._gateways.asObservable();
    }
    
    get gateway$(): Observable<any> {
        return this._gateway.asObservable();
    }
    
    getAllGateways(params?: any): Observable<any[]> {
        return this.http.get('/gateway', {
            params
        }).pipe(
            tap((response: any) => {
                this._gateways.next(response);
            })
        );
    }
    
    getGateway(id: string): Observable<any> {
        return this.http.get(`/gateway/${id}`).pipe(
            tap((response: any) => {
                this._gateway.next(response);
            })
        );
    }
    
    save(body: any): Observable<any> {
        return this.http.post('/gateway', body).pipe(
            tap((response: any) => response)
        )
    }
    
    update(body: any, id: string): Observable<any> {
        return this.http.patch(`/gateway/${id}`, body).pipe(
            tap((response: any) => response)
        );
    }
    
    delete(id: string): Observable<any> {
        return this.http.delete(`/gateway/${id}`).pipe(
            tap((response: any) => response)
        )
    }
}
