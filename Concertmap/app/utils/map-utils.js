import Polyline from '@mapbox/polyline'

import { setting } from '../config/settings';

export function getDirection(fromCoords, toCoords) {
    let url = 'https://maps.googleapis.com/maps/api/directions/json?&';
        url += 'origin=' + fromCoords.latitude + ',' + fromCoords.longitude;
        url += '&destination=' + toCoords.lat + ',' + toCoords.lng;

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
   /* return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          return this.createRouteCoordinates(responseJson)
         // return responseJson;
        })
        .catch((error) => {
          return error;
    });*/
  }

export function createRouteCoordinates(data) {
  if (data.status !== 'OK') { return []; }

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
