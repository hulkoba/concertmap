import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';

import { detail } from '../styles/detail';
import { fonts } from '../styles/fonts';

export default class ListDetail extends Component {
	render() {
		const { concert } = this.props;

		return (
      <View style={detail.container}>
        <Text style={fonts.title}>
          {concert.title}
        </Text>
        <Text style={fonts.info}>
          {concert.releaseYear}
        </Text>

      </View>
		)
	}
}

ListDetail.propTypes = {
  concert: PropTypes.object
};
