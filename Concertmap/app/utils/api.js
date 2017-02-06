import { SONGKICK_API_KEY,
        GOOGLE_DISTANCE_KEY,
        SOUNDCLOUD_CLIENT_ID } from '../config/settings';


export function getArtistImage(id) {
   if(id) {
      return `http://images.sk-static.com/images/media/profile_images/artists/${id}/huge_avatar`;
    }
}

export function getVenueDetails(venueId) {
  return fetch(`http://api.songkick.com/api/3.0/venues/${venueId}.json?apikey=${SONGKICK_API_KEY}`)
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
      url += '&language=de';
      if(mode) {
        url += '&mode=' + mode;
      }
      url+='&key=' + GOOGLE_DISTANCE_KEY;

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
  let url = 'https://maps.googleapis.com/maps/api/directions/json?';
      url += '&origin=' + fromCoords.latitude + ',' + fromCoords.longitude;
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
      }).catch((err) => (reject(err)));
  });
}

export function getSongsByArtist(artist) {
  return new Promise((resolve, reject) => {
    fetch(`http://api.soundcloud.com/tracks.json?client_id=${SOUNDCLOUD_CLIENT_ID}&q=${artist}`)
      .then((response) => {
          return response.json();
      }).then((json) => {
          const soundData = json.map((data) => {
            if(data.kind === 'track' && data.streamable) {
              return {
                title: data.title,
                streamUrl: data.stream_url,
                url: data.stream_url + 'client_id=' + SOUNDCLOUD_CLIENT_ID,
                cover: data.artwork_url
              }
            }
          });
        resolve(soundData);
      }).catch((err) => (reject(err)));
  });
}


export function getSong(streamUrl) {
  return new Promise((resolve, reject) => {
    fetch(`${streamUrl}s?client_id=${SOUNDCLOUD_CLIENT_ID}`)
      .then((response) => {
          return response.json();
      }).then((json) => {
          resolve(json);
      }).catch((err) => (reject(err)));
  });
}
/* export function getSongsByArtist(query) {
    const query_string = query.split(' ').join('+');

    return new Promise((resolve, reject) => {
      // advanced search: format, creator, title, identifier, sorted by downloads
    fetch('http://archive.org/advancedsearch.php?q='+query+'&fl%5B%5D=creator&fl%5B%5D=format&fl%5B%5D=downloads&fl%5B%5D=identifier&fl%5B%5D=title&sort%5B%5D=downloads+desc&sort%5B%5D=&sort%5B%5D=&rows=50&page=1&output=json&save=yes')
      .then((response) => {
        return response.json();
      }).then((json) => {
        const lowQuery = query.toLowerCase();
        const data = json.response.docs.filter((d) => {
          if(d.creator) {
            if(d.creator instanceof Array) {
              return d.creator.includes((creator) => (creator.toLowerCase() === query.toLowerCase()))
            } else {
              return d.creator.toLowerCase() === lowQuery
            }
          }
        });
        resolve(data);
      }).catch((err) => (reject(err)));
  });
}

export function getSong(id) {
  return new Promise((resolve, reject) => {
    fetch('https://archive.org/metadata/' + id)
      .then((response) => {
          return response.json();
      }).then((json) => {
          const audios = json.files.filter((file) => (file.format === 'VBR MP3'));
          if(audios.length === 0) return;
          const url = 'https://archive.org'+json.dir+'/'+audios[0].name;
          resolve({title: audios[0].title, url});
      }).catch((err) => {
          alert('error: '+ JSON.stringify(err));
          reject(err);
      });
  });
}*/
