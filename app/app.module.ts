import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule }   from '@angular/http';

import { GeneralModule } from './modules/general.module';
import { WeatherModule } from './modules/weather.module';
import { MapModule } from './modules/map.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        GeneralModule,
        WeatherModule,
        MapModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}