import { Component } from '@angular/core';

interface IWind {
    deg: number,
    speed: number
}

@Component({
    selector: 'wind',
    templateUrl: `app/components/wind/wind.component.html`,
    inputs: ['wind']
})
export class Wind {
    wind: IWind;
}