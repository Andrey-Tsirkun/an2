import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { CommonModule } from '@angular/common';
import { WeatherList } from './components/weatherlist/weatherlist.component';
import { Pager } from './components/pager/pager.component';
import { Header } from './components/header/header.component';
import { Map } from './components/map/map.component';
import { Footer } from './components/footer/footer.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { KelvintocelsiumPipe } from './pipes/kelvintocelsium.pipe';
import { Config } from './config/config'

let config = new Config();

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
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
        KelvintocelsiumPipe
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}