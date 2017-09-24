import {
	SONGKICK_KEY,
	SOUNDCLOUD_ID,
	GOOGLE_DISTANCE
} from 'react-native-dotenv';

export const SONGKICK_API_KEY = SONGKICK_KEY;
export const SONGKICK_URL = `http://api.songkick.com/api/3.0/events.json?apikey=${SONGKICK_API_KEY}`;
export const TICKETMASTER_URL = 'http://www.ticketmaster.de/search/?keyword=';
export const SOUNDCLOUD_CLIENT_ID = SOUNDCLOUD_ID;
export const GOOGLE_DISTANCE_KEY = GOOGLE_DISTANCE;