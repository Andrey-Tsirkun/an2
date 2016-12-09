import {Pipe, PipeTransform} from '@angular/core';
import {Http} from '@angular/http';
import {XHR} from '../services/xhr';
import {Config} from '../config/config';
import {KelvintocelsiumPipe} from './kelvintocelsium.pipe';

import {Observable} from 'rxjs';

let config = new Config();

@Pipe({
    name: 'cityweather',
    pure: false
})
export class CityweatherPipe extends XHR implements PipeTransform {

    private cache: Map<string, Object>;
    private obs: Observable<Object>;

    constructor(private http:Http){
        super()
        this.cache = new Map<string, Object>();
        this.obs = null;
    }

    prevRequested = []
    transform(value: string): Observable<Object> {
        if (this.cache.has(value)){
            return Observable.from([this.cache.get(value)])
        }

        this.obs = this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=2db3d261239176a961c5abc853c5b1c7`).share()
        let subsc = this.obs.subscribe(res => {console.log('subscr responce');this.cache.set(value, res); subsc.unsubscribe()})

        return this.obs
    }
}