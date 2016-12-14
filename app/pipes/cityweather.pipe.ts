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
    cachedNames: string[];
    cityCache: CityTemp[] = [];

    constructor(private http: Http) {}

    transform(city: string): Observable<CityTemp> {

        let index: number;
        this.cachedNames = this.cityCache.map(n => n.name);
        index = this.cachedNames.indexOf(city);
        console.log(this.cachedNames, this.cityCache, index)

        if (index === -1) {
            this.output = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.id}`)
                .map(newCity => {
                    console.log('newCity', JSON.parse(newCity["_body"]))
                    this.cityCache.push(JSON.parse(newCity["_body"]));
                    return newCity;
                })
        }
        else {
            const cachedIndex = this.cityCache[index];
            const name = cachedIndex.name;
            const temp = cachedIndex.main.temp;

            this.output = new Observable(
                (observer: Subscriber<CityTemp>) => {
                    observer.next(`${name}: current temperature is ${temp}°C`);
                });
        }

        return this.output;
    }

            /*if(this.model.hasOwnProperty(value)) {
                return new Promise(()=> {})
            }
            else {
                return this.get(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${config.id}`).then((res) => {
                    let data = JSON.parse(res.text);

                    cityName = data.name;
                    temp = new KelvintocelsiumPipe().transform(data.main.temp);
                    humidity = data.main.humidity;
                    pressure = data.main.pressure;
                    wind = data.wind.speed;

                    this.model[cityName] = {
                        temp: new KelvintocelsiumPipe().transform(data.main.temp),
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        wind: data.wind.speed,
                        stamp: + new Date()
                    };

                    return `<div>${cityName}</div>
                            <div><span>Temperature:</span> ${temp}°</div>
                            <div><span>Humidity:</span> ${humidity}%</div>
                            <div><span>Pressure:</span> ${pressure} gPa</div>
                            <div><span>Wind:</span> ${wind} m/s</div>`;
                }, (err) => {
                    return `<div>Something went wrong!</div>
                            <div>err</div>`
                });
            }*/

    }
