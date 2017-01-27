import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { Map } from './components/map/map.component';

import { Config } from '../config/config';
let config = new Config();

@NgModule({
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: config.googleMapKey
        }),],
    declarations: [Map],
    exports: [Map]
})
export class MapModule {}