import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router';

import { Cityweather } from './components/cityweather/cityweather.component';
import { WeatherList } from './components/weatherlist/weatherlist.component';
import { Wind } from './components/wind/wind.component';
import { WeatherIcon } from './components/weathericon/weathericon.component';
import { WeatherForm } from './components/weatherform/weatherform.component';
import { ControlMessages } from './components/formmessages/formmessages.component'

import { WeatherColor } from './directives/weathercolor/weathercolor.directive';
import { WindInfo } from './directives/windinfo/windinfo.directive';

import { CityweathertodataPipe } from './pipes/cityweathertodata.pipe'
import { KelvinToCelsiumPipe } from './pipes/kelvintocelsium.pipe'

import { WeatherRouting } from './weather.routing'

import { Logger } from '../services/logger.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        WeatherRouting
    ],
    declarations: [
        Wind,
        WeatherColor,
        WindInfo,
        WeatherList,
        Cityweather,
        WeatherIcon,
        WeatherForm,
        ControlMessages,
        CityweathertodataPipe,
        KelvinToCelsiumPipe
    ],
    providers: [
        Logger
    ],
    exports: [
        Wind, WeatherColor, WindInfo, WeatherList, Cityweather, WeatherIcon, WeatherForm, ControlMessages
    ]
})
export class WeatherModule {}