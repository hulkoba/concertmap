import React, { PropTypes } from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';

import { fonts } from '../../config/styles';
import { style } from './rowStyles';

const Row = ({gig, onRowPressed}) => (
  <TouchableHighlight
    onPress={() => onRowPressed(gig)}
    underlayColor='#008bae'>
    <View style={style.row}>
      <View style={style.imageView}>
        <Image style={style.image}
          source={{uri: gig.image}} />
      </View>

      <View style={style.column}>
        <View style={style.titleRow}>
          <View style={style.title}>
            <Text style={fonts.title}>
              {gig.title}
            </Text>
              {gig.support ? <Text style={fonts.action}>  and more</Text> : null}
          </View>
          <Text style={fonts.info}>
            ~{gig.distance} km
          </Text>
        </View>

        <Text style={fonts.subTitle}>
          {gig.venue}
        </Text>

        <Text style={fonts.info}>
          {gig.time}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
)


Row.propTypes = {
  gig: PropTypes.object.isRequired,
  onRowPressed: PropTypes.func.isRequired,
};

export default Row;
