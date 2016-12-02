import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { WeatherList } from './components/weatherlist/weatherlist.component';
import { Pager } from './components/pager/pager.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, WeatherList, Pager ],
    bootstrap: [ AppComponent ]
})

export class AppModule {}
