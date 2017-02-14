import {Component, ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { Logger } from "../../../services/logger.service";
import { PositionService } from '../../../services/services';
import { HttpService } from '../../../services/http.service';

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

/*interface IWeatherError {
    statusCode: number,
    statusText: string
}*/

interface IFormData {
    controls: {
        number: { value: string },
        icon: { value: string},
        wind: { value: boolean }
    }
}

interface IResponse {
    coords: {
        latitude: number,
        longitude: number
    }
}

const GeoSrv = new PositionService();

@Component({
    selector: 'weather-list',
    templateUrl: `app/weather/components/weatherlist/weatherlist.component.html`,
    inputs: ['visibleStart', 'visibleEnd', 'updDate', 'formData'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherList {
    cities: IWeatherData;
    visibleStart: number;
    visibleEnd: number;
    /*weatherError: IWeatherError;*/
    updDate: Date;
    selected: boolean;
    formData: IFormData;
    showIcon: boolean;
    lat: number;
    lon: number;
    itemsNum: number;

    constructor(loggerService: Logger, private httpService: HttpService) {
        loggerService.log('weather list load')
    }

    ngOnInit() {
        this.visibleStart = 0;
        this.visibleEnd = 10;
        this.formData = {
            controls: {
                number: { value: '50' },
                icon: { value: 'YES'},
                wind: { value: true }
            }
        }

        GeoSrv.getCurrCoords().then((resp: IResponse) => {
            this.lat = resp.coords.latitude;
            this.lon = resp.coords.longitude;

            this.httpService.getWeather(resp.coords)
                .retry(0)
                .map(res => res.json().list)
                .filter( x => x.length )
                .take(50)
                .subscribe(
                    res => {
                        this.cities = res;
                        this.itemsNum = Object.keys(this.cities).length;
                        this.updDate = new Date();
                    },
                    err => {
                        console.log(err);
                    })
        });
    }

    ngOnChanges() {
        if(this.formData) {
            this.showIcon = this.formData.controls.icon.value == 'YES'
        }
        console.log('456', this.cities)
        if(this.cities) {
            console.log('ololo', this.cities)
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