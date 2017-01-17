import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { filterBar } from './barStyles';

export default class FilterBar extends Component {

	render() {
		const { filter } = this.props;
		return (
      <View style={filterBar.bar}>
        <View style={filterBar.filterRow}>
          {filter.map((f) => {
            return(
              <Text style={filterBar.filter} key={f}>{f}</Text>
              )
          })}
        </View>

        <View style={filterBar.filterRow}>
          <SimpleLineIcons name="magnifier" style={filterBar.icon} />
          <SimpleLineIcons name="equalizer"
            style={[filterBar.icon, filterBar.filterIcon]} />
        </View>
      </View>
		)
	}
}

FilterBar.propTypes = {
  filter: PropTypes.array.isRequired,
};