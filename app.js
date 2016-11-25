"use strict";
require('./node_modules/bootstrap/dist/css/bootstrap.css');
require('./parts/scss/main.scss');
var services_1 = require('./parts/ts/services');
var utils_1 = require('./parts/ts/utils');
var pagination_1 = require('./parts/ts/pagination');
var pagination = new pagination_1.Pagination();
var WeatherSrv = new services_1.WeatherService(new services_1.XHR());
var GeoSrv = new services_1.PositionService();
var PrintWeather = new utils_1.PrintWeatherData();
GeoSrv.getCurrCoords().then(function (resp) { return WeatherSrv.getWeather(resp.coords).then(function (resp) {
    PrintWeather.createTable(resp);
    pagination.init();
}); });
//# sourceMappingURL=app.js.map