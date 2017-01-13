import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, ListView, View, Text, Image } from 'react-native';

import { list } from '../styles/listStyles';

export default class ListDetail extends Component {
	render() {
		const { concert } = this.props;
		alert(JSON.stringify(concert));

		return (
      <View style={list.container}>

        <View style={list.imageView}>
          <Image style={list.image}
            source={require('../img/pugtato.png')} />
        </View>

				<Text style={list.title}>
					{gig.title}
				</Text>

				<Text style={list.subTitle}>
					{gig.releaseYear}
				</Text>
      </View>
		)
	}
}

ListDetail.propTypes = {
  concert: PropTypes.object.isRequired
};