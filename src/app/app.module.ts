import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { MarkdownModule } from 'ngx-markdown';

import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { GatewayService } from 'app/core/services/gateway.service';
import { PeripheralService } from 'app/core/services/peripheral.service';
import { GatewaysResolver } from "app/core/services/gateways.resolver";
import { MusalaSoftInterceptor } from "app/core/interceptor/musala-soft.interceptor";
import { GatewayResolver } from "app/core/services/gateway.resolver";
import { PeripheralsResolver } from "app/core/services/peripherals.resolver";
import { PeripheralsByGatewayResolver } from "app/core/services/peripherals-by-gateway.resolver";

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        GatewayService,
        PeripheralService,
        GatewaysResolver,
        GatewayResolver,
        PeripheralsResolver,
        PeripheralsByGatewayResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MusalaSoftInterceptor,
            multi: true
        }
    ]
})
export class AppModule
{
}
