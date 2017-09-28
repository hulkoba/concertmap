import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import { fonts } from '../../config/styles';
import { style } from './detailHeader';

const propTypes = {
	gig: PropTypes.object.isRequired
};

const DetailHeader = ({ gig }) => (
	<View style={style.titlerow}>
		<Text style={fonts.title}>{gig.title}</Text>

		{gig.support && <Text style={fonts.importantInfo}>with {gig.support}</Text>}

		{gig.subSupport && <Text style={fonts.importantInfo}>and {gig.subSupport}</Text>}
	</View>
);

DetailHeader.propTypes = propTypes;
export default DetailHeader;
