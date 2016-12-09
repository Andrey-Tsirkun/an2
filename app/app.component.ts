/// <reference path="../typings/index.d.ts" />

import { Component } from '@angular/core';
import { PositionService, WeatherService } from './services/services';
import { Config } from './config/config';

const WeatherSrv = new WeatherService();
const GeoSrv = new PositionService();
let config = new Config();

interface Response {
    coords: {
        latitude: number,
        longitude: number
    }
}

interface WeatherData {
    name: string,
    main: {
        temp: number
    },
    weather: {
        0: {
            icon: string
        }
    }
}

@Component({
    selector: 'app',
    template: `
        <main>
            <weather-header></weather-header>
            <weather-list [weatherError]="weatherError" [cities]="cities" [visibleStart]="visibleStart" [visibleEnd]="visibleEnd" [updDate]="updDate"></weather-list>
            <pager id="pager" [itemsNum]="itemsNum" (onChanged)="onChanged($event)"></pager>
            <weather-map [lat]="lat" [lon]="lon"></weather-map>
            <weather-footer></weather-footer>
        </main>
        <aside>
            <weather-cityweather></weather-cityweather>
        </aside>        
        `
})

export class AppComponent {
    cities: WeatherData;
    visibleStart: number;
    visibleEnd: number;
    itemsNum: number;
    lat: number;
    lon: number;
    weatherError: {
        statusCode: number,
        statusText: string
    };
    updDate: Date;

    ngOnInit() {
        GeoSrv.getCurrCoords().then((resp: Response) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;

            WeatherSrv.getWeather(resp.coords).then(resp => {
                this.cities = resp.list;
                this.itemsNum = Object.keys(this.cities).length;
                this.updDate = new Date();
            }, (err) => {
                this.updDate = new Date();
                this.weatherError = err;
            })
        });
    }

    onChanged(numStart){
        this.visibleStart = numStart;
        this.visibleEnd = numStart + config.itemsPerPage;
    }
}