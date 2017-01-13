import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text, Image, Linking } from 'react-native';

import { detail } from '../styles/detail';
import { fonts } from '../styles/fonts';

export default class ListDetail extends Component {
	render() {
		const { concert } = this.props;

		return (
      <ScrollView style={detail.container}>
        <Text style={fonts.title}>
          {concert.title}
        </Text>
        <Text style={fonts.info}>
          {concert.releaseYear}
        </Text>

         <View style={detail.imageView}>
          <Image style={detail.image}
            source={require('../img/pugtato.png')} />
        </View>

        <Text style={fonts.title}>
          8€ - Morgen 20:00 Uhr
        </Text>

        <Text style={fonts.importantInfo}>
          BrotFabrik
        </Text>
        <Text style={fonts.importantInfo}>
          HalliGalliplatz 1
        </Text>
        <Text style={fonts.importantInfo}>
          13087 Berlin
        </Text>

        <Text style={fonts.link}
          onPress={() => Linking.openURL('http://www.berliner-nachtgesang.de')}>
          http://www.berliner-nachtgesang.de
        </Text>

        <Text style={fonts.info}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.'}
          </Text>

      </ScrollView>
		)
	}
}

ListDetail.propTypes = {
  concert: PropTypes.object
};
