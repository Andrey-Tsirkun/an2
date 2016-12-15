import { Pipe, PipeTransform } from '@angular/core';
import { KelvinToCelsiumPipe } from './kelvintocelsium.pipe';

interface IPipeData {
    main: {
        temp: number
    }
}

@Pipe({
    name: 'cityweatherjsontodata'
})
export class CityweathertodataPipe implements PipeTransform {
    transform(value: IPipeData): number {
        if(value) {
            return new KelvinToCelsiumPipe().transform(value.main.temp)
        }
    }
}
