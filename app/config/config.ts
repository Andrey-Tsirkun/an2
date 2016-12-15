interface IConfig {
    id: string;
    url: string;
}

export class Config implements IConfig{
    id:string = '2db3d261239176a961c5abc853c5b1c7';
    url:string = 'http://api.openweathermap.org/data/2.5/find?';
    itemsPerPage:number = 10;
    googleMapKey:string = 'AIzaSyAqdXGXCd1EUzZ8VmYgrFXd7H8nKnaqhsU';
    refreshWeatherPeriod:number = 30000; // 30 min
}