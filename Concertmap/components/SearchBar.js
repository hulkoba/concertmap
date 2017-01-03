import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

//import { barStyles } from '../styles/barStyles';

export default class SearchBar extends Component {

	render() {
		const { filter } = this.props;
	
		return (		
			<View
			
			/>	
		)
	}
}

SearchBar.propTypes = {
  filter: PropTypes.array.isRequired,
};