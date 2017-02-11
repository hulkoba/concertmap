import moment from 'moment';

import { getArtistImage } from './api';
import { getDistance } from './map-utils';

export function sortByDistance(concerts) {
  return concerts.sort((a,b) => (a.distance - b.distance));
}

export function buildConcerts(gigs, devicePosition) {

    return gigs.map((gig) => {
      const position = {
        lat: gig.venue.lat ? gig.venue.lat : gig.location.lat,
        lng: gig.venue.lng ? gig.venue.lng : gig.location.lng,
      };
      const distance = getDistance(devicePosition, position);
      const support = gig.performance.find((act) => act.billingIndex === 2);
      const subSupport = gig.performance.find((act) => act.billingIndex === 3);

      return {
        id: gig.id,
        title: gig.performance[0].displayName.split(' (official)')[0],
        venue: gig.venue.displayName,
        support: support ? support.displayName : null,
        subSupport: subSupport ? subSupport.displayName : null,
        city: gig.location.city.split(',')[0],
        position,
        time: gig.start.time ? gig.start.time.slice(0, -3) : '',
        datetime: gig.start.datetime ? moment(gig.start.datetime).calendar().split(' um')[0] :  moment(gig.start.date).calendar().split(' um')[0],
        image: getArtistImage(gig.performance[0].artist.id),
        venueId: gig.venue.id,
        distance: distance,
        url: gig.uri,
      }
    /*  if(supports.length > 0) {
        alert(JSON.stringify(supports));
        concert.support = supports[0].displayName;
        // supports.length > 1 ? concert.subSupport = supports[1].displayName : null;
      } */
    });
  }