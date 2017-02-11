import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import moment from 'moment';

import { style } from './dayFilter';

export default class FilterBar extends Component {

  static getWeekDays() {
    const filters = [];
    for(let i = 0; i <=6; i++) {
      filters.push(moment().add(i, 'days'));
    }
    return filters;
  }

	render() {
		const { activeFilter, setFilter } = this.props;
    const filter = FilterBar.getWeekDays();
		return (
      <View style={style.bar}>
        {filter.map((f) => {
          return(
            <TouchableHighlight
              onPress={() => setFilter(f)}
              key={f}
              activeOpacity={0.5}
              underlayColor='#006279'>
              <Text
                style={ f.date() === activeFilter.date() ? style.activeFilter : style.filter}>
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
  setFilter: PropTypes.func.isRequired,
};
