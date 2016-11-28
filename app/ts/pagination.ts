const ITEMS_PER_PAGE: number = 10;

export class Pagination {
    start: number = 0;
    constructor() {
        let self = this;
        document.querySelector('#btn_prev').addEventListener('click', function() {
            self.change(false);
        }, false);

        document.querySelector('#btn_next').addEventListener('click', function() {
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

        if(direction) {
            cnt += ITEMS_PER_PAGE;
            this.start += ITEMS_PER_PAGE;

            if(cnt > liSet.length - ITEMS_PER_PAGE) {
                cnt = liSet.length - ITEMS_PER_PAGE;
                this.start = liSet.length - ITEMS_PER_PAGE;
            }
        }
        else {
            cnt -= ITEMS_PER_PAGE;
            this.start -= ITEMS_PER_PAGE;

            if(cnt < 0) {
                cnt = 0;
                this.start = 0;
            }
        }

        if(cnt <= liSet.length - ITEMS_PER_PAGE && cnt >= 0) {
            this.init(cnt)
        }
    }
}