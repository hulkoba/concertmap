import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';

import { filterBar } from './barStyles';

export default class FilterBar extends Component {
	render() {
		const { filter, setFilter } = this.props;
		return (
      <View style={filterBar.bar}>
        {filter.map((f) => {
          return(
            <TouchableHighlight
              onPress={() => setFilter(f)}
              key={f}
              activeOpacity={0.5}
              underlayColor='#fff'>
              <Text style={filterBar.filter}>{f}</Text>
            </TouchableHighlight>
            )
        })}
      </View>
		)
	}
}

FilterBar.propTypes = {
  filter: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
};
