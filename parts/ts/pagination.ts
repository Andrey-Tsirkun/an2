const ITEMS_PER_PAGE: number = 10;
// let currentStart: number = 0;

export class Pagination {

    start: number = 0;

    constructor() {

        let self = this;

        document.querySelector('#btn_prev').addEventListener('click', function( event ) {
            self.change(false);
        }, false);

        document.querySelector('#btn_next').addEventListener('click', function( event ) {
            self.change(true);
        }, false);

    }

    init(start: number = 0) {

        let liSet = document.getElementsByTagName('li');

        for(let i = 0; i < liSet.length; i++) {
            liSet[i].classList.remove('visible');
        }

        for(let i = start; i < start + ITEMS_PER_PAGE; i++) {
            liSet[i].classList.add('visible');
        }

    }

    change(direction: boolean) {

        let cnt: number = this.start,
            liSet = document.getElementsByTagName('li');

        console.log(1, cnt)

        if(direction) {

            cnt += ITEMS_PER_PAGE;
            this.start += ITEMS_PER_PAGE;

        }
        else {

            cnt -= ITEMS_PER_PAGE;
            this.start -= ITEMS_PER_PAGE;

        }

        console.log(2, cnt)

        if(cnt <= liSet.length && cnt >= 0) {

            this.init(cnt)

        }

    }

}