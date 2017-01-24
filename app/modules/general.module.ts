import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { Pager } from '../components/pager/pager.component';
import { Header } from '../components/header/header.component';
import { Footer } from '../components/footer/footer.component';
import { FavoriteList } from '../components/favoriteList/favoriteList.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        Pager,
        Header,
        Footer,
        FavoriteList
    ],
    exports: [
        Pager,
        Header,
        Footer,
        FavoriteList
    ]
})
export class GeneralModule {}