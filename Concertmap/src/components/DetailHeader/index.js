import React, { PropTypes } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import ShareBtn from '../ShareBtn';

import { style } from './tabs';

const DetailHeader = ({ gig, goBack }) => (
  <View style={style.header}>
    <TouchableHighlight
      onPress={goBack}>
      <View style={style.tabTextShare}>
        <SimpleLineIcons name="arrow-left" style={style.tabTextBack} />
        <Text style={style.tabTextBack}>ZURÜCK</Text>
      </View>
      </TouchableHighlight>

   <ShareBtn concert={gig}/>
  </View>
)


DetailHeader.propTypes = {
  goBack: PropTypes.func.isRequired,
  gig: PropTypes.object.isRequired
};

export default DetailHeader;