import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PeripheralService {

    private _peripherals: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
    _peripheral: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) { }


    get peripherals$(): Observable<any[]> {
        return this._peripherals.asObservable();
    }

    getAllPeripheral(params?: any): Observable<any[]> {
        return this.http.get('/peripheral', {
            params
        }).pipe(
            tap((response: any) => {
                this._peripherals.next(response);
            })
        );
    }
    
    getPeripheral(id: string): Observable<any> {
        return this.http.get(`/peripheral/${id}`).pipe(
            tap((response: any) => {
                this._peripheral.next(response);
            })
        );
    }
    
    save(body: any): Observable<any> {
        return this.http.post('/peripheral', body).pipe(
            tap((response) => response)
        );
    }
    
    update(body: any, id: string): Observable<any> {
        return this.http.patch(`/peripheral/${id}`, body).pipe(
            tap((response) => response)
        );
    }
}
