import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Concerts from './src/components/Concerts';

class Concertmap extends Component {
	render() {
		return (<Concerts />)
	}
}
AppRegistry.registerComponent('Concertmap', () => Concerts);
