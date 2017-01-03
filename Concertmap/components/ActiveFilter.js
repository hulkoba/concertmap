import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { barStyles } from '../styles/barStyles';

export default class ActiveFilter extends Component {

	render() {
		const { filter } = this.props;

		return (	   
      <View style={barStyles.bar}>
        {filter.map((f) => {
          return(
            <Text style={barStyles.filter} key={f}>{f}</Text>
            )
        })}  
      </View>	
		)
	}
}

ActiveFilter.propTypes = {
  filter: PropTypes.array.isRequired,
};