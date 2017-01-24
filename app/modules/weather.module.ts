import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { Cityweather } from '../components/cityweather/cityweather.component';
import { WeatherList } from '../components/weatherlist/weatherlist.component';
import { Wind } from '../components/wind/wind.component';
import { WeatherIcon } from '../components/weathericon/weathericon.component';

import { WeatherColor } from '../directives/weathercolor/weathercolor.directive';
import { WindInfo } from '../directives/windinfo/windinfo.directive';

import { CityWeatherPipe } from '../pipes/cityweather.pipe';
import { CityweathertodataPipe } from '../pipes/cityweathertodata.pipe';
import { KelvinToCelsiumPipe } from '../pipes/kelvintocelsium.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        Wind,
        WeatherColor,
        WindInfo,
        CityWeatherPipe,
        CityweathertodataPipe,
        KelvinToCelsiumPipe,
        WeatherList,
        Cityweather,
        WeatherIcon,
    ],
    providers: [],
    exports: [
        Wind, WeatherColor, WindInfo, CityWeatherPipe, CityweathertodataPipe, KelvinToCelsiumPipe, WeatherList, Cityweather, WeatherIcon
    ]
})
export class WeatherModule {}