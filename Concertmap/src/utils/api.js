import {
	SONGKICK_API_KEY,
	GOOGLE_DISTANCE_KEY,
	SOUNDCLOUD_CLIENT_ID
} from '../config/constants';


export function getArtistImage(id) {
	if (id) {
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
	if (mode) {
		url += '&mode=' + mode;
	}
	url += '&key=' + GOOGLE_DISTANCE_KEY;

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
	if (mode) {
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
		fetch(`http://api.soundcloud.com/tracks?q=${artist}&client_id=${SOUNDCLOUD_CLIENT_ID}`)
			.then((response) => {
				return response.json();
			}).then((json) => {
				const soundData = json.map((data) => {
					if (data.kind === 'track' && data.streamable) {
						return {
							title: data.title,
							streamUrl: data.stream_url
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
