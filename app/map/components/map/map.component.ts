import { Component } from '@angular/core';

@Component({
    selector: 'weather-map',
    templateUrl: `./map.component.html`,
    inputs: ['lat', 'lon']
})
export class Map {
    lat: number;
    lon: number;
    title: string = 'You are here';
}