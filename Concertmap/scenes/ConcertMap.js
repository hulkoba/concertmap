import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class ConcertMap extends Component {
	static get defaultProps() {
		return {
			title: 'Map'
		};
	}

	render() {
		return (
			<View>
				<Text>{this.props.title}.</Text>
			</View>
		)
	}
}