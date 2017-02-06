import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'weather-form',
    templateUrl: 'app/weather/components/weatherform/weatherform.component.html',
    inputs: ['cities']
})
export class WeatherForm {
    form: FormGroup;
    number: Array<number> = [10, 20, 30, 40, 50];
    @Output() formChanged = new EventEmitter<Object>();

    constructor(fb: FormBuilder) {
        this.form = fb.group({
            'number': ['50', Validators.required],
            'icon': ['YES', [Validators.required, this.iconValidator]],
            'wind': [true]
        });
    }

    onSubmit() {
        //this.formChanged.emit(this.form);
        console.log(this.form)
        this.form.reset();
    }

    // custom validator
    iconValidator(control: FormControl) {

        if(control.value === 'YES' || control.value === 'NO'){
            return null;
        }
        else {
            return {'iconFieldValid': true};
        }

    }
}