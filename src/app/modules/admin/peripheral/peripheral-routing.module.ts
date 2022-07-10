import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPeripheralComponent, PeripheralsComponent } from "app/modules/admin/peripheral/components";
import { PeripheralsResolver } from "app/core/services/peripherals.resolver";
import { GatewaysResolver } from "app/core/services/gateways.resolver";

const routes: Routes = [
    {
        path: '',
        component: PeripheralsComponent,
        resolve: {
            peripherals: PeripheralsResolver
        }
    },
    {
        path: 'add',
        component: AddPeripheralComponent,
        resolve: {
            gateways: GatewaysResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeripheralRoutingModule { }
