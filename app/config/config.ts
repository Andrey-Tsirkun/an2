interface IConfig {
    id: string;
    url: string;
}

export class Config implements IConfig{
    id = '2db3d261239176a961c5abc853c5b1c7';
    url = 'http://api.openweathermap.org/data/2.5/find?';
    itemsPerPage = 10;
    googleMapKey = 'AIzaSyAqdXGXCd1EUzZ8VmYgrFXd7H8nKnaqhsU'
}