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
            "wind": new FormControl("")
        });

        /*this.form.valueChanges
            .debounceTime(2000)
            .map((value) => {
                console.log(1, value)
            })
            //.filter((value) => this.form.valid)
            .subscribe((value) => {
                this.formChanged.emit(JSON.stringify(value));
            });*/
    }

    onSubmit() {
        console.log("model-based form submitted");
        console.log(this.form);

        this.formChanged.emit(this.form);
    }
}