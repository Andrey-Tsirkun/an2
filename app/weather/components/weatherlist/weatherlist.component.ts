import {Component, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { Logger } from "../../../services/logger.service";

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

interface IFormData {
    controls: {
        number: { value: string },
        start: { value: string },
        wind: { value: boolean }
    }
}

@Component({
    selector: 'weather-list',
    templateUrl: `app/weather/components/weatherlist/weatherlist.component.html`,
    inputs: ['cities', 'visibleStart', 'visibleEnd', 'weatherError', 'updDate', 'formData'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherList {
    cities: IWeatherData;
    visibleStart: number;
    visibleEnd: number;
    weatherError: IWeatherError;
    updDate: Date;
    selected: boolean;
    formData: IFormData;

    constructor(loggerService: Logger) {
        loggerService.log('weather list load')
    }

    ngOnInit() {
        this.visibleStart = 0;
        this.visibleEnd = 10;
        this.formData = {
            controls: {
                number: { value: '50' },
                start: { value: '' },
                wind: { value: false }
            }
        }
    }

    isActive(i) {
        return (i + 1 <= this.visibleEnd) && (i + 1 >= this.visibleStart);
    }

    ngOnChanges() {
        console.log(666, this.formData)
    }

    markCity(city) {
        city.selected = !city.selected;
    }
}