import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherList } from './components/weatherlist/weatherlist.component';

const routes: Routes = [
    { path: '', component: WeatherList },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WeatherRouting {}
