import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Config } from '../config/config';
import {Observable} from "rxjs";
let config = new Config();

interface Coords {
    latitude: number,
    longitude: number
}


@Injectable()
export class HttpService {
    apiId: string = config.id;
    apiUrl: string = config.url;

    constructor(private http: Http){ }

    getCurrCoords() {
        let options = {
            maximumAge: 60000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((crd) => resolve(crd), (err) => reject(err), options);
        });
    }

    private getUrl(coords: {latitude: number, longitude: number}): string {
        return `${this.apiUrl}&lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.apiId}&cnt=50`;
    }

    getWeather(coords: Coords): Observable<Response> {
        let url = this.getUrl(coords);
        return this.http.get(url);
    }
}