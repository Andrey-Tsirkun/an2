import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[windinfo]'
})
export class WindInfo{
    @Input('windDeg') windDeg: number = 0;

    constructor(private elementRef: ElementRef){}

    ngOnChanges() {
        if (this.windDeg) {
            this.elementRef.nativeElement.style.transform = `rotate(${this.windDeg}deg)`;
        }
    }
}