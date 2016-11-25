"use strict";
var config_1 = require('./config');
var config = new config_1.Config();
var UrlString = (function () {
    function UrlString(lat, lon) {
        this.apiId = config.id;
        this.apiUrl = config.url;
        this.lon = lon;
        this.lat = lat;
    }
    UrlString.prototype.getUrl = function () {
        return this.apiUrl + "&units=metric&lat=" + this.lat + "&lon=" + this.lon + "&appid=" + this.apiId + "&cnt=50";
    };
    return UrlString;
}());
exports.UrlString = UrlString;
var PrintWeatherData = (function () {
    function PrintWeatherData() {
    }
    PrintWeatherData.prototype.createTable = function (data) {
        var elem = document.getElementById('weather-content'), ul = document.createElement('ul');
        ul.className = 'list-unstyled';
        ul.id = 'weatherList';
        elem.innerHTML = "";
        data.list.forEach(function (val, i, o) {
            var li = document.createElement('li'), imgUrl = "http://openweathermap.org/img/w/" + val.weather['0']['icon'] + ".png";
            li.className = 'weather-item';
            li.innerHTML = "\n                <div><h3>" + val.name + "</h3></div>\n                <div><h3>" + val.main.temp + "&#176;</h3></div>\n                <div><img src=\"" + imgUrl + "\"></div>";
            ul.appendChild(li);
        });
        elem.appendChild(ul);
    };
    return PrintWeatherData;
}());
exports.PrintWeatherData = PrintWeatherData;
//# sourceMappingURL=utils.js.map