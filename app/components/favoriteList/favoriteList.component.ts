import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm} from '@angular/forms';

export class City {
    constructor( public cityName: string) {}
}

@Component({
    selector: 'favorite-list',
    templateUrl: `app/components/favoriteList/favoriteList.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteList {
    list: Array<City> = [];
    opened: boolean = false;

    onSubmit(form: NgForm){
        let name = new City(form.value.cityName);
        this.list.push(name);
    }

    removeCity(index: number) {
        this.list.splice(index, 1);
    }

    toggleList() {
        this.opened = !this.opened;
    }
}