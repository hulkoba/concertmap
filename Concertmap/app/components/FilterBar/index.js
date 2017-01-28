import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';

import { filterBar } from './barStyles';

export default class FilterBar extends Component {

	render() {
		const { filter } = this.props;
		return (
      <View style={filterBar.bar}>
        {filter.map((f) => {
          return(
            <Text style={filterBar.filter} key={f}>{f}</Text>
            )
        })}
      </View>
		)
	}
}

FilterBar.propTypes = {
  filter: PropTypes.array.isRequired,
};
