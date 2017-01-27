import { NgModule } from '@angular/core';

import { CityWeatherPipe } from './pipes/cityweather.pipe';
import { CityweathertodataPipe } from './pipes/cityweathertodata.pipe';
import { KelvinToCelsiumPipe } from './pipes/kelvintocelsium.pipe';

@NgModule({
    declarations: [
        CityWeatherPipe,
        CityweathertodataPipe,
        KelvinToCelsiumPipe
    ],
    exports: [
        CityWeatherPipe,
        CityweathertodataPipe,
        KelvinToCelsiumPipe
    ]
})
export class SharedModule {}