/// <reference path="../typings/index.d.ts" />

import { Component } from '@angular/core';
import { PositionService } from './services/services';
import { Config } from './config/config';
import { HttpService } from './services/http.service';

const GeoSrv = new PositionService();
let config = new Config();

interface IResponse {
    coords: {
        latitude: number,
        longitude: number
    }
}

interface ICityWeather {
    name: string,
    main: {
        temp: number
    },
    weather: {
        0: {
            icon: string
        }
    },
    selected: boolean
}

@Component({
    selector: 'app',
    providers: [HttpService],
    template: `
        <main>        
            <weather-header></weather-header>
            <weather-form></weather-form>
            <weather-list 
                [weatherError]="weatherError"
                [cities]="cities"
                [visibleStart]="visibleStart"
                [visibleEnd]="visibleEnd"></weather-list>
            <pager id="pager"
                [itemsNum]="itemsNum"
                (onChanged)="onChanged($event)"></pager>
            <weather-map
                [lat]="lat"
                [lon]="lon"></weather-map>
            <weather-footer></weather-footer>
        </main>
        <aside>
            <weather-cityweather></weather-cityweather>
        </aside> 
        <favorite-list></favorite-list>
        `
})

export class AppComponent {
    cities: ICityWeather[];
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

    constructor(private httpService: HttpService){}

    ngOnInit() {
        GeoSrv.getCurrCoords().then((resp: IResponse) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;

            this.httpService.getWeather(resp.coords)
                .retry(3)
                .map(res => res.json().list)
                .filter( x => x.length )
                .take(50)
                .subscribe(
                    res => {
                        this.cities = res;
                        this.itemsNum = Object.keys(this.cities).length;
                        this.updDate = new Date();
                    },
                    err => {
                        this.weatherError = err
                    })
        });
    }

    onChanged(numStart){
        this.visibleStart = numStart;
        this.visibleEnd = numStart + config.itemsPerPage;
    }
}