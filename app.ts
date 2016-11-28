import './node_modules/bootstrap/dist/css/bootstrap.css';
import './app/scss/main.scss';

import {PositionService, WeatherService} from './app/ts/services/services';
import {PrintWeatherData} from './app/components/createWeatherList';

import { Pagination } from './app/ts/pagination';
const pagination = new Pagination();

const WeatherSrv = new WeatherService();
const GeoSrv = new PositionService();
const PrintWeather = new PrintWeatherData();

interface Response {
    coords: {
        latitude: number,
        longitude: number
    }
}

GeoSrv.getCurrCoords().then((resp: Response) => WeatherSrv.getWeather(resp.coords).then(resp => {
    PrintWeather.createTable(resp);
    pagination.init();
}));