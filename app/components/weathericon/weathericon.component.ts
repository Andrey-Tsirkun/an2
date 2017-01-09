import { Component } from '@angular/core';

@Component({
    selector: 'weather-icon',
    templateUrl: `app/components/weathericon/weathericon.component.html`,
    inputs: ['id']
})
export class WeatherIcon {
    id:number;

    ngOnChanges() {
        this.id = +(this.id / 100).toFixed(0);
    }
}