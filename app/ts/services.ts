import { UrlString } from '../com/createUrl';

interface Coords {

    latitude: number,
    longitude: number

}

export class Header {
    header: string;
    data: string;
    constructor(header: string, data: string) {
        this.header = header;
        this.data = data;
    }
}

export class Data {
    headers: string;
    body: string;
    text: string;
    json: Object;
    type: string;
    statusCode: number;
    statusText: string;

    public static FromXHR(jsXHR: XMLHttpRequest): Data {
        var data = new Data();
        data.headers = jsXHR.getAllResponseHeaders();
        // data.body = jsXHR.responseBody;
        data.text = jsXHR.responseText;

        if (/Content-Type: application\/json/i.test(data.headers)) {
            data.json = JSON.parse(data.text);
        }

        data.type = jsXHR.responseType;
        data.statusCode = jsXHR.status;
        data.statusText = jsXHR.statusText;
        return data;
    }
}

export class XHR {

    private sendCommand(method: string, url: string, headers: Array<Header>, data: string = ''): Promise<Data> {
        return new Promise<Data>((resolve, reject) => {
            var jsXHR = new XMLHttpRequest();
            jsXHR.open(method, url);

            if (headers != null) {
                headers.forEach((header) => {
                    jsXHR.setRequestHeader(header.header, header.data);
                });
            }

            jsXHR.onload = (ev) => {
                if (jsXHR.status < 200 || jsXHR.status >= 300) {
                    reject(Data.FromXHR(jsXHR));
                }
                resolve(Data.FromXHR(jsXHR));
            }

            jsXHR.onerror = (ev) => {
                reject('Error ' + method.toUpperCase() + 'ing data to url "' + url + '", check that it exists and is accessible');
            };

            if (method == 'POST') {
                jsXHR.send(data);
            } else {
                jsXHR.send();
            }
        });
    }

    public get(url: string, headers: Array<Header> = null): Promise<Data> {
        return this.sendCommand('GET', url, headers);
    }

    public post(url: string, data: string = "", headers: Array<Header> = null): Promise<Data> {
        return this.sendCommand('POST', url, headers, data);
    }
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

export class WeatherService extends XHR{
    getWeather(coords: Coords) {
        let url = new UrlString(coords.latitude, coords.longitude).getUrl();
        return this.get(url).then((res) => {
            return JSON.parse(res.text);
        })
    }
}