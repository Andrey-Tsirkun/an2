import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherList } from './components/weatherlist/weatherlist.component';
import { Pager } from './components/pager/pager.component';
import { Header } from './components/header/header.component';
import { Map } from './components/map/map.component';
import { Footer } from './components/footer/footer.component';
import { Cityweather } from './components/cityweather/cityweather.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { KelvintocelsiumPipe } from './pipes/kelvintocelsium.pipe';
import { CityweatherPipe } from './pipes/cityweather.pipe';
import { Config } from './config/config'
import {TemplatePipe} from "./pipes/template.pipe";

let config = new Config();

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: config.googleMapKey
        })
    ],
    declarations: [
        AppComponent,
        Header,
        WeatherList,
        Pager,
        Map,
        Footer,
        KelvintocelsiumPipe,
        CityweatherPipe,
        TemplatePipe,
        Cityweather
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}