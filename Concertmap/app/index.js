import React, { Component } from 'react';
import { TouchableHighlight, Text, View, ActivityIndicator, Navigator } from 'react-native';

import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FBSDK from 'react-native-fbsdk';
const { ShareDialog } = FBSDK;

// overwrite native styles for showing the filter.
// see https://github.com/facebook/react-native/issues/10600
import * as navStyles from './config/LocalNavigationBarStylesAndroid';
import { styles } from './components/Concerts/styles';
import { settings } from './config/settings';
import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';


export default class Concerts extends Component {

  static getWeekDays() {
    const filters = [];
    for(let i = 0; i <=6; i++) {
      filters.push(moment().add(i, 'days'));
    }
    return filters;
  }

  constructor(props) {
    super(props);
     moment.locale('de', {
      weekdaysMin : "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    });

    this.state = {
      loading: true,
      error: false,
      concerts: [],
      activeFilter: moment(),
      position: {
          latitude: 52.5555,
          longitude: 13.3333,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        },
    };
  }

  componentDidMount() {
    this.getPosition();
    this.getConcertsFromAPI();
  }

  setFilter = (filter) => {
    this.setState({activeFilter: filter, loading: true});
    this.getConcertsFromAPI(filter);
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
         (position) => {
            const currentPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.001,
              longitudeDelta: 0.01,
            }

            this.setState({ position: currentPosition });
            this.getConcertsFromAPI();
         },
         (error) => console.log(error),
         {enableHighAccuracy: false, timeout: 10000, maximumAge: 0}
      );
  }

  getArtistImage(id) {
    if(id) {
      return `http://images.sk-static.com/images/media/profile_images/artists/${id}/huge_avatar`
    }
  }
  buildConcerts(gigs) {
    return gigs.map((gig) => {
      const position = {
        lat: gig.venue.lat ? gig.venue.lat : gig.location.lat,
        lng: gig.venue.lng ? gig.venue.lng : gig.location.lng,
      };

      return {
        title: gig.performance[0].displayName,
        venue: gig.venue.displayName,
        city: gig.location.city.split(',')[0],
        position,
        time: gig.start.time ? gig.start.time.slice(0, -3) : '',
        datetime: gig.start.datetime ? moment(gig.start.datetime).format('DD.MMM.YY HH:mm') : moment(gig.start.date).format('DD.MMM.YY'),
        image: this.getArtistImage(gig.performance[0].artist.id),
        url: gig.uri,
      }
    });
  }

  getConcertsFromAPI = (filter) => {
    const searchDate = moment(filter).format('YYYY-MM-DD');

    return fetch(`${settings.SONGKICK_URL}&location=geo:${this.state.position.latitude},${this.state.position.longitude}&min_date=${searchDate}&max_date=${searchDate}`)
    .then((response) => response.json())
    .then((responseJson) => {
      const concerts = this.buildConcerts(responseJson.resultsPage.results.event);
      alert(JSON.stringify(concerts));

      this.setState({
       loading: false,
       concerts
      });
      return responseJson;
    })
    .catch((error) => {
      this.setState({ error: true });
      return error;
    });
  }

  shareConcert = (data) => {
    const shareLinkContent = {
      contentType: 'link',
      contentTitle: `${data.title} im ${data.venue}!`,
      contentUrl: data.url,
      imageUrl: data.image,
      contentDescription: `Kommt alle mit zu ${data.title} im ${data.venue}!`,
    };
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) { return ShareDialog.show(shareLinkContent) }
      }
    ).then(
      function(result) {
        if (result.isCancelled) { alert('Share operation was cancelled') } else {
          alert('Share was successful with postId: ' + result.postId); }
      },
      function(error) { alert('Share failed with error: ' + error) }
    );
  };

  renderScene = (route, navigator, index) => {
    switch (route.index) {
      case 0:
        return <ConcertList
           concerts={this.state.concerts}
           navigator={navigator}
          />;
      case 1:
        return <ConcertMap
          concerts={this.state.concerts}
          region={this.state.position}
          navigator={navigator}
        />;
		  case 2:
        return <Detail
                  navigator={navigator}
                  region={this.state.position}
                  concert={route.data} />;
		  default:
        return null;
    }
  };

  render() {
    const { loading, error, activeFilter } = this.state
		const routes = [
			{ title: 'List', index: 0, key: 'list' },
			{ title: 'Map', index: 1, key: 'map' },
			{ title: 'Detail', index: 2, key: 'detail', data: {} },
		];

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator animating={true} />
        </View>
      )
    }
    if (error) {
      return (
				<View style={styles.center}>
					<Text>Konnte keine Konzerte laden!</Text>
				</View>
			)
    }

    return (
			 <Navigator
				 	style={styles.tabBar}
          sceneStyle={{paddingTop: navStyles.General.TotalNavHeight}}
					initialRoute={routes[0]}
					renderScene={this.renderScene}
				  navigationBar={

					 <Navigator.NavigationBar
            navigationStyles={navStyles}
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
                switch(route.index) {
                  case 0:
									 return (<Text style={styles.tabTextActive}>LISTE</Text>);
                  case 1:
                    return (<TouchableHighlight onPress={() => navigator.jumpBack()}>
                          <Text style={styles.tabText}>LISTE</Text>
                        </TouchableHighlight>);
                  case 2:
                    return (
                      <TouchableHighlight onPress={() => navigator.pop()}>
                        <View style={styles.tabTextShare}>
                          <SimpleLineIcons name="arrow-left" style={styles.tabTextBack} />
                          <Text style={styles.tabTextBack}>ZURÜCK</Text>
                        </View>
                      </TouchableHighlight>);
                  default:
                    break;
                }
							},
							RightButton: (route, navigator, index, navState) => {
                switch(route.index) {
                  case 0:
                    return (
                      <TouchableHighlight onPress={() => {
                          if (route.index === 0) {
                            navigator.push(routes[1]);
                          } else {
                            navigator.pop();
                          }
                        }}>
                        <Text style={styles.tabText}>KARTE</Text>
                      </TouchableHighlight>);
                  case 1:
                    return <Text style={styles.tabTextActive}>KARTE</Text>;
                  case 2:
                     return (
                      <TouchableHighlight onPress={() => this.shareConcert(route.data)}>
                        <View style={styles.tabTextShare} >
                          <MaterialIcons name="share" style={styles.icon} />
                          <Text style={styles.icon}>Teilen</Text>
                        </View>
                      </TouchableHighlight>);
                  default:
                    break;
                }
							},
							Title: (route, navigator, index, navState) => {
								return ( route.index === 2 ?
                        <Text style={styles.dsplNone}>.</Text>
                       :
                       <FilterBar
                          filter={Concerts.getWeekDays()}
                          activeFilter={activeFilter}
                          setFilter={this.setFilter.bind(this)}/>);
							},
						}}
					/>
				}
      />
    )
  }
}
