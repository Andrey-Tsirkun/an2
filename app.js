"use strict";
require('./node_modules/bootstrap/dist/css/bootstrap.css');
var services_1 = require('./parts/ts/services');
var utils_1 = require('./parts/ts/utils');
var WeatherSrv = new services_1.WeatherService(new services_1.XHR());
var GeoSrv = new services_1.PositionService();
var PrintWeather = new utils_1.PrintWeatherData();
GeoSrv.getCurrCoords().then(function (resp) { return WeatherSrv.getWeather(resp.coords).then(function (resp) { return PrintWeather.createTable(resp); }); });
/*GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});*/ 
//# sourceMappingURL=app.js.map