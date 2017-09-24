import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';

import { fonts } from '../../config/styles';
import { style } from './detailHeader';

const DetailHeader = ({ gig }) => (
  <View style={style.titlerow}>
    <Text style={fonts.title}>
      {gig.title}
    </Text>

    {gig.support &&
      <Text style={fonts.importantInfo}>
        with {gig.support}
      </Text>}

    {gig.subSupport &&
      <Text style={fonts.importantInfo}>
        and {gig.subSupport}
      </Text>}
  </View>

)


DetailHeader.propTypes = {
  gig: PropTypes.object.isRequired
};

export default DetailHeader;