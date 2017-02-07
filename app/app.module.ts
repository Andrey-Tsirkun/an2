import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule }   from '@angular/http';
import { ReactiveFormsModule } from "@angular/forms";

import { CoreModule } from './core/core.module';
import { WeatherModule } from './weather/weather.module';
import { MapModule } from './map/map.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
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