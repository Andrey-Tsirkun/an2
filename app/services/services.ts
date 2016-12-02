import { Config } from '../config/config';
import { XHR } from './xhr'
let config = new Config();

interface Coords {

    latitude: number,
    longitude: number

}

export class PositionService {

    getCurrCoords() {
        let options = {
            maximumAge: 60000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((crd) => resolve(crd), (err) => reject(err), options);
        });
    }
}

export class WeatherService extends XHR {
    apiId: string = config.id;
    apiUrl: string = config.url;

    constructor() {
        super();
    }

    private getUrl(coords: {latitude: number, longitude: number}): string {
        return `${this.apiUrl}&units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=${this.apiId}&cnt=50`;
    }

    getWeather(coords: Coords) {
        let url = this.getUrl(coords);
        return this.get(url).then((res) => {
            return JSON.parse(res.text);
        })
    }
}