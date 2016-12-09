import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'kelvintocelsium'
})
export class KelvintocelsiumPipe implements PipeTransform {
    transform(value: number): number {
        return +(value - 273.15).toFixed(1);
    }
}