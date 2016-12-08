/// <reference path="../typings/index.d.ts" />

import { Component } from '@angular/core';
import { PositionService, WeatherService } from './services/services';
import { Config } from './config/config'

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
        <weather-header></weather-header>
        <weather-list [weatherError]="weatherError" [cities]="cities" [visibleStart]="visibleStart" [visibleEnd]="visibleEnd"></weather-list>
        <pager id="pager" [itemsNum]="itemsNum" (onChanged)="onChanged($event)"></pager>
        <weather-map [lat]="lat" [lon]="lon"></weather-map>
        <weather-footer></weather-footer>
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

    ngOnInit() {

        GeoSrv.getCurrCoords().then((resp: Response) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;

            WeatherSrv.getWeather(resp.coords).then(resp => {
                this.cities = resp.list;
                this.itemsNum = Object.keys(this.cities).length;
            }, (err) => {
                this.weatherError = err;
            })
        });
    }

    onChanged(numStart){
        this.visibleStart = numStart;
        this.visibleEnd = numStart + config.itemsPerPage;
    }
}