import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { barStyles } from '../styles/barStyles';

export default class ActiveFilter extends Component {

	render() {
		const { filter } = this.props;

		return (	   
      <View style={barStyles.bar}>
        <View style={barStyles.filterRow}>
          {filter.map((f) => {
            return(
              <Text style={barStyles.filter} key={f}>{f}</Text>
              )
          })}
        </View> 

        <SimpleLineIcons name="equalizer" style={barStyles.icon} />
      </View>	
		)
	}
}

ActiveFilter.propTypes = {
  filter: PropTypes.array.isRequired,
};