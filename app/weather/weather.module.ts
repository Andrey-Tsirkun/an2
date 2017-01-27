import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'

import { Cityweather } from './components/cityweather/cityweather.component';
import { WeatherList } from './components/weatherlist/weatherlist.component';
import { Wind } from './components/wind/wind.component';
import { WeatherIcon } from './components/weathericon/weathericon.component';

import { WeatherColor } from './directives/weathercolor/weathercolor.directive';
import { WindInfo } from './directives/windinfo/windinfo.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        Wind,
        WeatherColor,
        WindInfo,
        WeatherList,
        Cityweather,
        WeatherIcon,
    ],
    providers: [],
    exports: [
        Wind, WeatherColor, WindInfo, WeatherList, Cityweather, WeatherIcon
    ]
})
export class WeatherModule {}