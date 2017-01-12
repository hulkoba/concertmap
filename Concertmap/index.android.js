import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Concerts from './components/Concerts';

class Concertmap extends Component {
  render() {
		const routes = [
			{ title: 'Concerts', index: 0 },
			{ title: 'ListDetail', index: 1 },
			{ title: 'MapDetail', index: 2 },
		];
    return (
      <Navigator
				style={{flex: 1}}
       	initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={(route, navigator) => {
					return <Concerts />
				}}
      />
    )
  }
}

AppRegistry.registerComponent('Concertmap', () => Concerts);
