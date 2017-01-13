import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';

import { list } from '../styles/listStyles';

export default class ListDetail extends Component {
	render() {
		const { concert } = this.props;
		alert('render Detail!');

		return (
      <View style={list.container}>

        <View style={list.imageView}>
          <Image style={list.image}
            source={require('../img/pugtato.png')} />
        </View>
        <Text style={list.title}>
          {concert ? concert.title : 'Hallo'}
        </Text>

      </View>
		)
	}
}

ListDetail.propTypes = {
  concert: PropTypes.object
};