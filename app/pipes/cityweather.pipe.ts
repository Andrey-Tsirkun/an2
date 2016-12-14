import { Pipe, PipeTransform } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Config } from '../config/config';
import {Observable, Subscription} from "rxjs";

let config = new Config();

interface CityTemp {
    name: string;
}

@Pipe({
    name: 'cityweather'
})
export class CityweatherPipe implements PipeTransform {
    model = {};

    constructor(private http: Http) {}

    transform(city: string): Observable<Subscription> {
        if(city) {
            let data = {},
                cityName: string,
                temp: number,
                humidity: number,
                pressure: number,
                wind: number;

            console.log(city, this.model);

            if(this.model.hasOwnProperty(city)) {
                return Observable.of(this.model[city]);
            }
            else {
                return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.id}`).subscribe();
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
    }
}