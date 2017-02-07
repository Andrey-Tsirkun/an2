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

interface IFormData {
    controls: {
        number: { value: string },
        icon: { value: string},
        wind: { value: boolean }
    }
}

@Component({
    selector: 'app',
    providers: [HttpService],
    template: `
        <main>        
            <weather-header></weather-header>            
            <weather-list 
                [weatherError]="weatherError"
                [cities]="cities"
                [visibleStart]="visibleStart"
                [visibleEnd]="visibleEnd"
                [formData]="formData"></weather-list>
            <pager id="pager"
                [itemsNum]="itemsNum"
                (onChanged)="onChanged($event)"
                [formData]="formData"></pager>
            <div class="bottomContent">
                <weather-form [cities]="cities" (formChanged)="formChanged($event)" class="col-sm-6"></weather-form>
                <weather-map
                    class="col-sm-6"
                    [lat]="lat"
                    [lon]="lon"></weather-map>
            </div>    
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
    formData: IFormData;

    constructor(private httpService: HttpService){}

    ngOnInit() {
        GeoSrv.getCurrCoords().then((resp: IResponse) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;

            this.httpService.getWeather(resp.coords)
                .retry(0)
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

    formChanged(formData) {
        this.formData = {
            controls: {
                number: { value: formData.controls.number.value },
                icon: { value: formData.controls.icon.value },
                wind: { value: formData.controls.wind.value }
            }
        };
    }
}