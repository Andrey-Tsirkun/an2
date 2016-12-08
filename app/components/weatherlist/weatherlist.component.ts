import { Component } from '@angular/core';

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

interface WeatherError {
    statusCode: number,
    statusText: string
}

@Component({
    selector: 'weather-list',
    templateUrl: `app/components/weatherlist/weatherlist.component.html`,
    inputs: ['cities', 'visibleStart', 'visibleEnd', 'weatherError', 'updDate']
})
export class WeatherList {
    cities: WeatherData;
    visibleStart: number;
    visibleEnd: number;
    weatherError: WeatherError;
    updDate: Date;

    ngOnInit() {
        this.visibleStart = 0;
        this.visibleEnd = 10;
    }

    isActive(i) {
        return (i + 1 <= this.visibleEnd) && (i + 1 >= this.visibleStart);
    }
}