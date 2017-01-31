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

import ConcertMap from './components/ConcertMap';
import ConcertList from './components/ConcertList';
import Detail from './components/Detail';
import FilterBar from './components/FilterBar';


export default class Concerts extends Component {

  static getWeekDays() {
    const filters = [];
    for(let i = 0; i <=6; i++) {
      filters.push(moment().add(i, 'days').format('dd'));
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
      activeFilter: moment().format('dd'),
      position: 'unknown',
    };
  }

  componentDidMount() {
    this.getPosition();
    this.getMoviesFromApiAsync();
    if(this.state.position === 'unknown') {
      this.setState({
        position: {
          latitude: 52.5555,
          longitude: 13.3333,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }
      });
    }
  }

  setFilter = (filter) => {
    alert(filter);
    this.setState({activeFilter: filter});
    // , loading: true
   // this.getMoviesFromApiAsync();
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
         (position) => {
            alert(JSON.stringify(position));
            this.setState({
              position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.01,
              }
            });
            alert(JSON.stringify(this.state.position));
         },
         (error) => alert(JSON.stringify(error)),
         {enableHighAccuracy: false, timeout: 10000, maximumAge: 0}
      );
  }
  getMoviesFromApiAsync = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {

     this.setState({
       loading: false,
       concerts: responseJson.movies
      });
     return responseJson;
    })
    .catch((error) => {
      this.setState({ error: true });
      return error;
    });
  }

  shareConcert = (data) => {
    /*contentURL: der zu teilende Link
      contentTitle: gibt den Inhaltstitel im Link an
      imageURL: die URL eines Miniaturbildes, das im Beitrag angezeigt wird
      contentDesscription: Beschreibung des Inhalts, für gewöhnlich zwei bis vier Sätze*/
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://berliner-nachtgesang.de",
      contentDescription: 'Kommt alle mit!',
    };
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share operation was cancelled');
        } else {
          alert('Share was successful with postId: ' + result.postId);
        }
      },
      function(error) {
        alert('Share failed with error: ' + error);
      }
    );
  };

  renderScene = (route, navigator, index) => {
    switch (route.index) {
      case 0:
        return <ConcertList
           concerts={this.state.concerts}
           filter={this.state.filter}
           navigator={navigator}
          />;
      case 1:
        return <ConcertMap
          concerts={this.state.concerts}
          filter={this.state.filter}
          region={this.state.position}
          navigator={navigator}
        />;
		  case 2:
        return <Detail
                  navigator={navigator}
                  concert={route.data} />;
		  default:
        return null;
    }
  };

   // source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
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
				// 	initialRouteStack={routes}
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
