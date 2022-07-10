import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    GatewayComponent, GatewayFormComponent, GatewayViewComponent
} from 'app/modules/admin/gateway/components';
import { GatewaysResolver } from "app/core/services/gateways.resolver";
import { GatewayResolver } from "app/core/services/gateway.resolver";
import { PeripheralsByGatewayResolver } from "app/core/services/peripherals-by-gateway.resolver";

const routes: Routes = [
    {
        path: '',
        component: GatewayComponent,
        resolve: {
            gateways: GatewaysResolver
        }
    },
    {
        path: 'add',
        component: GatewayFormComponent
    },
    {
        path: 'edit/:id',
        component: GatewayFormComponent,
        resolve: {
            gateway: GatewayResolver
        }
    },
    {
        path: ':id',
        component: GatewayViewComponent,
        resolve: {
            gateway: GatewayResolver,
            peripherals: PeripheralsByGatewayResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GatewayRoutingModule { }
