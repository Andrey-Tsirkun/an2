import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[weathercolor]'
})
export class WeatherColor{
    @Input('temp') temp: number = 0;

    constructor(private elementRef: ElementRef){}

    ngOnChanges() {
        if (this.temp) {
            this.elementRef.nativeElement.style.color = this.shadeColor(+(this.temp - 273.15).toFixed(0));
        }
    }

    shadeColor(percent: number) {

        let color: string = percent > 0 ? "#fe4042" : "#42b4e6",
            R:number = parseInt(color.substring(1, 3), 16),
            G:number = parseInt(color.substring(3, 5), 16),
            B:number = parseInt(color.substring(5, 7), 16);

        R = R * (100 + percent) / 100;
        G = G * (100 + percent) / 100;
        B = B * (100 + percent) / 100;

        R = Math.round((R < 255) ? R : 255);
        G = Math.round((G < 255) ? G : 255);
        B = Math.round((B < 255) ? B : 255);

        return `rgb(${R}, ${G}, ${B})`
    }
}