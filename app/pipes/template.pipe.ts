import {Pipe, PipeTransform} from '@angular/core';
import {KelvintocelsiumPipe} from "./kelvintocelsium.pipe";

@Pipe({
    name: 'templatePipe',
    pure: false
})
export class TemplatePipe implements PipeTransform {
    prevRequested = []
    transform(data: any): string {
        if (!data) return ''
        console.log('tmplPipe -> ', data)

        let cityName: string,
            temp: number,
            humidity: number,
            pressure: number,
            wind: number,
            tmpl: string = '';

        let json = JSON.parse(data.text);

        cityName = json.name;

        humidity = json.main.humidity;
        pressure = json.main.pressure;
        wind = json.wind.speed;



        return `<div>${cityName}</div>
                            <div><span>Temperature:</span> ${temp}°</div>
                            <div><span>Humidity:</span> ${humidity}%</div>
                            <div><span>Pressure:</span> ${pressure} gPa</div>
                            <div><span>Wind:</span> ${wind} m/s</div>`;
    }

}