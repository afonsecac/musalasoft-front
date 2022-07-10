import { NgModule } from '@angular/core';

import { PeripheralRoutingModule } from './peripheral-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { cmpPeripherals } from "app/modules/admin/peripheral/components";
import { FuseAlertModule } from "@fuse/components/alert";


@NgModule({
  declarations: [
      ...cmpPeripherals
  ],
  imports: [
    SharedModule,
    PeripheralRoutingModule,
    FuseAlertModule
  ]
})
export class PeripheralModule { }
