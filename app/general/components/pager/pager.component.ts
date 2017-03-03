import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Config } from '../../../config/config'

let config = new Config();

interface IFormData {
    controls: {
        number: { value: string },
        icon: { value: string},
        wind: { value: boolean }
    }
}

@Component({
    selector: 'pager',
    templateUrl: `./pager.component.html`,
    inputs: ['formData']
})
export class Pager {
    start: number = 0;
    formData: IFormData;
    @Output() onChanged = new EventEmitter<number>();
    _itemsNum: number;
    disabledNext: boolean = false;

    @Input()
    set itemsNum(itemsNum: number) {
        this._itemsNum = itemsNum;
    }

    ngOnInit() {
        this.formData = {
            controls: {
                number: { value: '50' },
                icon: { value: '' },
                wind: { value: false }
            }
        }
    }

    ngOnChanges() {
        this.checkNumber();
    }

    changePage(direction: boolean): void {
        // console.log(222, this._itemsNum, +this.formData.controls.number.value)
        let cnt: number = this.start;

        if(direction) {
            cnt += config.itemsPerPage;
            this.start += config.itemsPerPage;

            if(cnt > this.itemsNum - config.itemsPerPage) {
                cnt = this._itemsNum - config.itemsPerPage;
                this.start = this._itemsNum - config.itemsPerPage;
            }
        }
        else {
            cnt -= config.itemsPerPage;
            this.start -= config.itemsPerPage;

            if(cnt < 0) {
                cnt = 0;
                this.start = 0;
            }
        }

        if(cnt <= this._itemsNum - config.itemsPerPage && cnt >= 0) {
            this.onChanged.emit(cnt);
        }

        this.checkNumber();
    }

    checkNumber() {
        if(this.formData) {
            this.disabledNext = +this.formData.controls.number.value - this.start == 10
        }
    }
}