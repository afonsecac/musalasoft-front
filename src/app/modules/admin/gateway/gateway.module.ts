import { NgModule } from '@angular/core';

import { GatewayRoutingModule } from './gateway-routing.module';
import { cmpGateway } from 'app/modules/admin/gateway/components';
import { SharedModule } from "app/shared/shared.module";
import { FuseAlertModule } from "@fuse/components/alert";


@NgModule({
    declarations: [
        ...cmpGateway
    ],
    imports: [
        GatewayRoutingModule,
        SharedModule,
        FuseAlertModule
    ]
})
export class GatewayModule {
}
