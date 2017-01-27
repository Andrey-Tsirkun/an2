import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Config } from '../../../config/config'

let config = new Config();

@Component({
    selector: 'pager',
    templateUrl: `app/general/components/pager/pager.component.html`
})
export class Pager {
    start: number = 0;
    @Output() onChanged = new EventEmitter<number>();
    _itemsNum: number;

    @Input()
    set itemsNum(itemsNum: number) {
        this._itemsNum = itemsNum;
    }

    changePage(direction: boolean): void {
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
    }
}