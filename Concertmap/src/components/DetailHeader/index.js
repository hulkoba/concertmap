import React, { PropTypes } from 'react';
import { View, Text, Linking } from 'react-native';

import { TICKETMASTER_URL } from '../../config/constants';

import { style } from './detailHeader';
import { fonts } from '../../config/styles';

const DetailHeader = ({ gig }) => (
  <View style={style.titlerow}>
    <View style={style.acts}>
      <Text style={fonts.title}>
        {gig.title}
      </Text>

      {gig.support &&
        <Text style={fonts.importantInfo}>
          with {gig.support}
        </Text> }

      {gig.subSupport &&
        <Text style={fonts.importantInfo}>
          and {gig.subSupport}
        </Text> }
    </View>

    <Text style={style.ticketButton}
      onPress={() => {
       Linking.openURL(`${TICKETMASTER_URL}${gig.title}+${gig.city}`)
      }}>
      Ticket kaufen
    </Text>
  </View>
)


DetailHeader.propTypes = {
  gig: PropTypes.object.isRequired
};

export default DetailHeader;