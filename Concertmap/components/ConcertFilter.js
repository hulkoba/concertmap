import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { barStyles } from '../styles/barStyles';

export default class ConcertFilter extends Component {

	render() {
		const { filter } = this.props;

		return (	
      <View style={barStyles.container}>
        
        <View style={barStyles.settings}>
          {filter.map((f) => {
            return(
              <Text style={barStyles.filter} key={f}>{f}</Text>
              )
          })}
        </View>	
      </View>
        
     
		)
	}
}

ConcertFilter.propTypes = {
  filter: PropTypes.array.isRequired,
};