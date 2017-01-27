import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { HttpService } from '../../../services/http.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

interface IForecast {
    dt_txt: string,
    main: {
        temp: number
    }
}

@Component({
    selector: 'weather-cityweather',
    templateUrl: `app/weather/components/cityweather/cityweather.component.html`,
})
export class Cityweather {
    cityForecast: Array<IForecast>;
    modelChanged: Subject<string> = new Subject<string>();
    bSubject = new BehaviorSubject(null);

    constructor(private httpService: HttpService) {

        // I know, this approach looks stupid, but i don't know any other place in my
        // project for BehaviourSubject implementation. =\
        this.bSubject.subscribe((value: string) => {
            console.log(`%c New value is: ${value}`, `color: orange`)
        });

        this.modelChanged
            .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe((model): void => {
                this.httpService.getCityWeather(model).subscribe((res: Array<IForecast>) => {
                    this.cityForecast = res;
                    this.bSubject.next(model);
                });
            });
    }

    changed(text: string):void {
        this.modelChanged.next(text);
    }
}