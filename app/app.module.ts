import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule }   from '@angular/http';

import { GeneralModule } from './general/general.module';
import { WeatherModule } from './weather/weather.module';
import { MapModule } from './map/map.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        SharedModule,
        GeneralModule,
        WeatherModule,
        MapModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    exports: [
        SharedModule
    ]
})

export class AppModule {}