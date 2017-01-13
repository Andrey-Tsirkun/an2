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