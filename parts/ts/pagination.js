"use strict";
var ITEMS_PER_PAGE = 10;
// let currentStart: number = 0;
var Pagination = (function () {
    function Pagination() {
        this.start = 0;
        var self = this;
        document.querySelector('#btn_prev').addEventListener('click', function (event) {
            self.change(false);
        }, false);
        document.querySelector('#btn_next').addEventListener('click', function (event) {
            self.change(true);
        }, false);
    }
    Pagination.prototype.init = function (start) {
        if (start === void 0) { start = 0; }
        var liSet = document.getElementsByTagName('li');
        for (var i = 0; i < liSet.length; i++) {
            liSet[i].classList.remove('visible');
        }
        for (var i = start; i < start + ITEMS_PER_PAGE; i++) {
            liSet[i].classList.add('visible');
        }
    };
    Pagination.prototype.change = function (direction) {
        var cnt = this.start, liSet = document.getElementsByTagName('li');
        console.log(1, cnt);
        if (direction) {
            cnt += ITEMS_PER_PAGE;
            this.start += ITEMS_PER_PAGE;
        }
        else {
            cnt -= ITEMS_PER_PAGE;
            this.start -= ITEMS_PER_PAGE;
        }
        console.log(2, cnt);
        if (cnt <= liSet.length && cnt >= 0) {
            this.init(cnt);
        }
    };
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map