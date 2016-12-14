import { Pipe, PipeTransform } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Config } from '../config/config';
import {Observable, Subscriber} from "rxjs";

let config = new Config();

interface CityTemp {
    id?: number;
    name?: string;
    main?: {
        temp: number
    };
    coord?: {
        lat: string,
        lon: string
    };
    dt?: number;
}

@Pipe({
    name: 'cityweather'
})
export class CityweatherPipe implements PipeTransform {
    output: Observable<CityTemp>;
    cache: Map<string, Object>;

    constructor(private http: Http) {
        this.cache = new Map<string,Object>();
    }

    transform(city: string): Observable<CityTemp> {

        if(city) {
            if (!this.cache.hasOwnProperty(city)) {
                this.output = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.id}`)
                    .map(data => {
                        let shortData = JSON.parse(data["_body"]);
                        this.cache[city] = shortData;
                        return shortData;
                    })
            }
            else {
                let cityData = this.cache[city]

                this.output = new Observable(
                    (observer: Subscriber<CityTemp>) => {
                        observer.next(cityData);
                    });
            }

            return this.output;
        }
    }
}
