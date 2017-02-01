import Polyline from '@mapbox/polyline'


// convert to radians
const toRad = function (num) {
    return num * Math.PI / 180
}
// see https://en.wikipedia.org/wiki/Haversine_formula
export function getDistance(start, end) {
    const dLat = toRad(end.lat - start.latitude);
    const dLon = toRad(end.lng - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const unit = {
        km: 6371,
    }

    return unit.km * c;
}


// travelMode = [DRIVING, BICYCLING, TRANSIT, WALKING]
// DRIVING = default
export function getDirection(fromCoords, toCoords, travelMode) {
    let url = 'https://maps.googleapis.com/maps/api/directions/json?&';
        url += 'origin=' + fromCoords.latitude + ',' + fromCoords.longitude;
        url += '&destination=' + toCoords.lat + ',' + toCoords.lng;

    if (travelMode) {
        url += '&mode=' + travelMode;
    }
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json();
            }).then((json) => {
                resolve(json);
            }).catch((err) => {
                reject(err);
            });
    });
}

export function createRouteCoordinates(data) {
    if (data.status !== 'OK') {
        return [];
    }

    /*overview_polyline contains a single points object that holds an encoded polyline representation of the route. This polyline is an approximate (smoothed) path of the resulting directions.*/
    const points = data.routes[0].overview_polyline.points;
    const steps = Polyline.decode(points);

    const polylineCoords = steps.map((step) => {
        return {
            latitude: step[0],
            longitude: step[1]
        }
    });
    return polylineCoords;
}
