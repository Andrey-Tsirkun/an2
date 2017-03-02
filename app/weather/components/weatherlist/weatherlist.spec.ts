/* tslint:disable:no-unused-variable */
import {
    async,
    inject,
    TestBed,
} from '@angular/core/testing';
import {} from 'jasmine';

import { WeatherList } from './weatherlist.component';

describe('WeatherList', () => {

    let fixture;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WeatherList],
            providers: []
        });

        fixture = TestBed.overrideComponent(WeatherList, {
            set: {
                template: '<span>{{message}}</span>'
            }})
            .createComponent(WeatherList);

        fixture.detectChanges();
    });

    it('should set the message', async(inject([], () => {
        fixture.componentInstance.setMessage('Test message');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('span').innerText).toEqual('Test message');
        });
    })));

});