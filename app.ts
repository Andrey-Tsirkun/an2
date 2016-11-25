import './node_modules/bootstrap/dist/css/bootstrap.css';

import {PositionService, XHR, WeatherService} from './parts/ts/services';
import {PrintWeatherData} from './parts/ts/utils';

const WeatherSrv = new WeatherService(new XHR());
const GeoSrv = new PositionService();
const PrintWeather = new PrintWeatherData();

interface Response {

    coords: {

        latitude: number,
        longitude: number

    }

}

GeoSrv.getCurrCoords().then((resp: Response) => WeatherSrv.getWeather(resp.coords).then(resp => PrintWeather.createTable(resp)));

import { GoogleMapsLoader } from 'google-maps';

/*GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});*/