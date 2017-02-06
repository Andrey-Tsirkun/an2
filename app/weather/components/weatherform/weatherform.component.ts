import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'weather-form',
    templateUrl: 'app/weather/components/weatherform/weatherform.component.html',
    inputs: ['cities']
})
export class WeatherForm {
    form: FormGroup;
    number: Array<number>;
    @Output() formChanged = new EventEmitter<Object>();

    constructor(fb: FormBuilder) {
        this.number = [10, 20, 30, 40, 50]; // can be moved to the loop

        this.form = fb.group({
            "number": new FormControl(this.number, Validators.required),
            "start": new FormControl("", Validators.required),
            "icon": new FormControl("YES", Validators.required),
            "wind": new FormControl(true)
        });
    }

    onSubmit() {
        console.log("model-based form submitted");
        console.log(this.form);

        this.formChanged.emit(this.form);
    }
}