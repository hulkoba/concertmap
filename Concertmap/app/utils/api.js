import { settings } from '../config/settings';


export function getVenueDetails(venueId) {
  return fetch(`http://api.songkick.com/api/3.0/venues/${venueId}.json?apikey=${settings.SONGKICK_API_KEY}`)
    .then((response) => response.json())
    .then((responseJson) => {
      return {
        venueLink: responseJson.resultsPage.results.venue.website,
        street: responseJson.resultsPage.results.venue.street,
        zip: responseJson.resultsPage.results.venue.zip,
      };
  })
  .catch((error) => (error));
 }

// travelMode = [DRIVING, BICYCLING, TRANSIT, WALKING]
export function getDuration(fromCoords, toCoords, mode) {
  let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
      url += 'origins=' + fromCoords.latitude + ',' + fromCoords.longitude;
      url += '&destinations=' + toCoords.lat + ',' + toCoords.lng;
      url += '&language=de'; //&key=' + settings.GOOGLE_KEY;
  if(mode) {
    url += '&mode=' + mode;
  }

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
          return response.json();
      }).then((json) => {
          resolve(json.rows[0].elements[0]);
      }).catch((err) => {
          reject(err);
      });
  });
}

export function getDirection(fromCoords, toCoords, mode) {
  let url = 'https://maps.googleapis.com/maps/api/directions/json?&';
      url += 'origin=' + fromCoords.latitude + ',' + fromCoords.longitude;
      url += '&destination=' + toCoords.lat + ',' + toCoords.lng;
  if(mode) {
    url += '&mode=' + mode;
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


