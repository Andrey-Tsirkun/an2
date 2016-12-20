import { Component, ChangeDetectionStrategy } from '@angular/core';

interface IWeatherData {
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

interface IWeatherError {
    statusCode: number,
    statusText: string
}

@Component({
    selector: 'weather-list',
    templateUrl: `app/components/weatherlist/weatherlist.component.html`,
    inputs: ['cities', 'visibleStart', 'visibleEnd', 'weatherError', 'updDate'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherList {
    cities: IWeatherData;
    visibleStart: number;
    visibleEnd: number;
    weatherError: IWeatherError;
    updDate: Date;
    selected: boolean;

    ngOnInit() {
        this.visibleStart = 0;
        this.visibleEnd = 10;
    }

    isActive(i) {
        return (i + 1 <= this.visibleEnd) && (i + 1 >= this.visibleStart);
    }

    markCity(city) {
        city.selected = !city.selected;
    }
}