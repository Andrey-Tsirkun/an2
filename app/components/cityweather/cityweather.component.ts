import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'weather-cityweather',
    templateUrl: `app/components/cityweather/cityweather.component.html`,
})
export class Cityweather {
    city: string;
    modelChanged: Subject<any> = new Subject<any>();

    constructor() {
        this.modelChanged
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((model): void => {
            console.log('->', model)
                this.city = model.target.value;
            });
    }

    changed(text: string) {
        this.modelChanged.next(text);
    }
}