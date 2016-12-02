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
        <weather-list [cities]="cities" [visibleStart]="visibleStart" [visibleEnd]="visibleEnd"></weather-list>
        <pager id="pager" [itemsNum]="itemsNum" (onChanged)="onChanged($event)"></pager>
        `
})

export class AppComponent {
    cities: WeatherData;
    visibleStart: number;
    visibleEnd: number;
    itemsNum: number;

    ngOnInit() {
        GeoSrv.getCurrCoords().then((resp: Response) => WeatherSrv.getWeather(resp.coords).then(resp => {
            this.cities = resp.list;
            this.itemsNum = Object.keys(this.cities).length;
        }));
    }

    onChanged(numStart){
        console.log(numStart)
        this.visibleStart = numStart;
        this.visibleEnd = numStart + config.itemsPerPage;
    }
}