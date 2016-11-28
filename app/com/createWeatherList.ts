interface WeatherList {
    list: [{
        name: string,
        main: {
            temp: number
        },
        weather: {
            0: {
                icon: string
            }
        }
    }]
}

export class PrintWeatherData {
    createTable(data: WeatherList) {
        let elem = document.getElementById('weather-content'),
            ul = document.createElement('ul');
        ul.className = 'list-unstyled';
        ul.id = 'weatherList';
        elem.innerHTML = ``;

        data.list.forEach((val, i , o) => {
            let li = document.createElement('li'),
                imgUrl = `http://openweathermap.org/img/w/${val.weather['0']['icon']}.png`;
            li.className = 'weather-item';
            li.innerHTML = `
                <div><h3>${val.name}</h3></div>
                <div><h3>${val.main.temp}&#176;</h3></div>
                <div><img src='${imgUrl}'></div>`;

            ul.appendChild(li);
        });

        elem.appendChild(ul);
    }
}