import { Pipe, PipeTransform } from '@angular/core';
import { XHR } from '../services/xhr';
import { Config } from '../config/config';

let config = new Config();

@Pipe({
    name: 'cityweather'
})
export class CityweatherPipe extends XHR implements PipeTransform {

    private cache :Map<string,Object>

    constructor(){
        super();
        this.cache = new Map<string,Object>();
    }

    transform(value: string): Object {

        return new Promise((resolve) => {

            if(!value){ resolve('');return;};

            if (this.cache.has(value)){
                resolve(this.cache.get(value));
                return;
            }

            this.get(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${config.id}`).then(resp => {
                this.cache.set(value, resp);
                resolve(resp);
            })
        });
    }
}