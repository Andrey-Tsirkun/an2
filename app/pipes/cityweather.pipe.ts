import { Pipe, PipeTransform } from '@angular/core';
import { XHR } from '../services/xhr';
import { Config } from '../config/config';
import { KelvintocelsiumPipe } from './kelvintocelsium.pipe';

let config = new Config();

@Pipe({
    name: 'cityweather'
})
export class CityweatherPipe extends XHR implements PipeTransform {
    model = {};
    transform(value: string): Object {
        if(value) {
            let data = {},
                cityName: string,
                temp: number,
                humidity: number,
                pressure: number,
                wind: number;

            console.log(value, this.model);

            if(this.model.hasOwnProperty(value)) {
                cityName = value;
                temp = this.model[value].temp;
                humidity = this.model[value].humidity;
                pressure = this.model[value].pressure;
                wind = this.model[value].wind;

                return `<div>${cityName}</div>
                        <div><span>Temperature:</span> ${temp}°</div>
                        <div><span>Humidity:</span> ${humidity}%</div>
                        <div><span>Pressure:</span> ${pressure} gPa</div>
                        <div><span>Wind:</span> ${wind} m/s</div>`;
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
            }
        }
    }
}