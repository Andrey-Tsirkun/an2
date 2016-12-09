import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'weather-cityweather',
    templateUrl: `app/components/cityweather/cityweather.component.html`,
})
export class Cityweather {
    city: string;
    modelChanged: Subject<string> = new Subject<string>();

    constructor() {
        this.modelChanged
            .debounceTime(1000)
            .distinctUntilChanged()
            .last()
            .subscribe((model): void => {
            console.log('->', model)
                this.city = model;
            });
    }

    changed(text: string) {
        this.modelChanged.next(text);
    }
}