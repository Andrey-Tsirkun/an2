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
        icon: { value: string},
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
    showIcon: boolean;

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
                icon: { value: 'YES'},
                wind: { value: true }
            }
        }
    }

    ngOnChanges() {
        if(this.formData) {
            console.log(2354, this.formData)
            this.showIcon = this.formData.controls.icon.value == 'YES'
        }
    }

    isActive(i) {
        let current: number = i + 1;
        return (current <= +this.formData.controls.number.value - 1) && (current <= this.visibleEnd) && (current >= this.visibleStart);
    }

    markCity(city) {
        city.selected = !city.selected;
    }
}