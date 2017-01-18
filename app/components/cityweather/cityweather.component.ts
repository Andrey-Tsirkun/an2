import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { HttpService } from '../../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IForecast {
    dt_txt: string,
    main: {
        temp: number
    }
}

@Component({
    selector: 'weather-cityweather',
    templateUrl: `app/components/cityweather/cityweather.component.html`,
})
export class Cityweather {
    cityForecast: Array<IForecast>;
    data: any;
    modelChanged: Subject<string> = new Subject<string>();


    constructor(private httpService: HttpService) {
        this.modelChanged
            .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe((model): void => {
                this.httpService.getCityWeather(model).subscribe((res: Array<IForecast>) => {

                    let bSubject = new BehaviorSubject(model);
                    bSubject.subscribe((value) => {
                        console.log(`%c New value is: ${value}`, `color: orange`)
                    });

                    this.cityForecast = res;
                });
            });
    }

    changed(text: string):void {
        this.modelChanged.next(text);
    }
}