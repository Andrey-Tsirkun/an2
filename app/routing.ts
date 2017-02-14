import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AccessGuard } from './core/guards/accessGuard';

import { NotFound } from './core/components/notfound/notfound.component';

const routers: Routes = [
    { path: 'weather', loadChildren: './weather/weather.module#WeatherModule' },
    { path: '404', component: NotFound },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routers) ],
    exports: [ RouterModule ]
})
export class WeatherAppRouting{}