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

@Component({
    selector: 'weather-list',
    templateUrl: `app/components/weatherlist/weatherlist.component.html`,
    inputs: ['cities', 'visibleStart', 'visibleEnd']
})
export class WeatherList {
    cities: WeatherData;
    visibleStart: number;
    visibleEnd: number;

    ngOnInit() {
        this.visibleStart = 0;
        this.visibleEnd = 10;
    }

    isActive(i) {
        console.log(this.visibleStart, this.visibleEnd);
        return (i + 1 <= this.visibleEnd) && (i + 1 >= this.visibleStart);
    }
}
