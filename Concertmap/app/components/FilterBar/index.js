import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import moment from 'moment';

import { filterBar } from './barStyles';

export default class FilterBar extends Component {
	render() {
		const { filter, activeFilter, setFilter } = this.props;
		return (
      <View style={filterBar.bar}>
        {filter.map((f) => {
          return(
            <TouchableHighlight
              onPress={() => setFilter(f)}
              key={f}
              activeOpacity={0.5}
              underlayColor='#006279'>
              <Text
                style={ f.date() === activeFilter.date() ? filterBar.activeFilter : filterBar.filter}>
                {moment(f).format('dd')}
              </Text>
            </TouchableHighlight>
            )
        })}
      </View>
		)
	}
}

FilterBar.propTypes = {
  activeFilter: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
};
