import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Text } from 'react-native';
import moment from 'moment';

import { style } from './dayFilter';

const propTypes = {
	activeFilter: PropTypes.object.isRequired,
	setFilter: PropTypes.func.isRequired
};

function getWeekDays() {
	const filters = [];
	for (let i = 0; i <= 6; i++) {
		filters.push(moment().add(i, 'days'));
	}
	return filters;
}
const filter = getWeekDays();

const FilterBar = ({ activeFilter, setFilter }) => (
	<View style={style.bar}>
		{filter.map(f => {
			return (
				<TouchableHighlight
					onPress={() => setFilter(f)}
					key={f}
					style={style.filterBox}
					activeOpacity={0.5}
					underlayColor="#006279"
				>
					<Text style={f.date() === activeFilter.date() ? style.activeFilter : style.filter}>
						{moment(f).format('dd')}
					</Text>
				</TouchableHighlight>
			);
		})}
	</View>
);

FilterBar.propTypes = propTypes;
export default FilterBar;
