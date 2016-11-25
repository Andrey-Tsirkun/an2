"use strict";
var utils_1 = require('./utils');
var es6_promise_1 = require('es6-promise');
var Header = (function () {
    function Header(header, data) {
        this.header = header;
        this.data = data;
    }
    return Header;
}());
exports.Header = Header;
var Data = (function () {
    function Data() {
    }
    Data.FromXHR = function (jsXHR) {
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
    };
    return Data;
}());
exports.Data = Data;
var XHR = (function () {
    function XHR() {
    }
    XHR.prototype.sendCommand = function (method, url, headers, data) {
        if (data === void 0) { data = ""; }
        return new es6_promise_1.Promise(function (resolve, reject) {
            var jsXHR = new XMLHttpRequest();
            jsXHR.open(method, url);
            if (headers != null) {
                headers.forEach(function (header) {
                    jsXHR.setRequestHeader(header.header, header.data);
                });
            }
            jsXHR.onload = function (ev) {
                if (jsXHR.status < 200 || jsXHR.status >= 300) {
                    reject(Data.FromXHR(jsXHR));
                }
                resolve(Data.FromXHR(jsXHR));
            };
            jsXHR.onerror = function (ev) {
                reject('Error ' + method.toUpperCase() + 'ing data to url "' + url + '", check that it exists and is accessible');
            };
            if (method == 'POST') {
                jsXHR.send(data);
            }
            else {
                jsXHR.send();
            }
        });
    };
    XHR.prototype.get = function (url, headers) {
        if (headers === void 0) { headers = null; }
        return this.sendCommand('GET', url, headers);
    };
    XHR.prototype.post = function (url, data, headers) {
        if (data === void 0) { data = ""; }
        if (headers === void 0) { headers = null; }
        return this.sendCommand('POST', url, headers, data);
    };
    return XHR;
}());
exports.XHR = XHR;
var PositionService = (function () {
    function PositionService() {
    }
    PositionService.prototype.getCurrCoords = function () {
        var options = {
            maximumAge: 60000,
            timeout: 5000,
            enableHighAccuracy: true
        };
        return new es6_promise_1.Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (crd) { return resolve(crd); }, function (err) { return reject(err); }, options);
        });
    };
    return PositionService;
}());
exports.PositionService = PositionService;
var WeatherService = (function () {
    function WeatherService(xhr) {
        this.xhr = xhr;
    }
    WeatherService.prototype.getWeather = function (coords) {
        var url = new utils_1.UrlString(coords.latitude, coords.longitude).getUrl();
        return this.xhr.get(url).then(function (res) {
            return JSON.parse(res.text);
        });
    };
    return WeatherService;
}());
exports.WeatherService = WeatherService;
//# sourceMappingURL=services.js.map