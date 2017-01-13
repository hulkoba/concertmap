import React, { Component, PropTypes } from 'react';
import { Navigator, TouchableHighlight, ListView, View, Text, Image } from 'react-native';

import FilterBar from './FilterBar';
import ListDetail from './ListDetail';
import { list } from '../styles/listStyles';

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged});

export default class ConcertList extends Component {

	 constructor (props) {
    super(props);
    this.dataSource = ds;
  }

	renderRow = (gig) => (
    <TouchableHighlight
			onPress={() => this.rowPressed(gig)}
      underlayColor='#008bae'>
      <View style={list.row}>
        <View style={list.imageView}>
          <Image style={list.image}
            source={require('../img/pugtato.png')} />
        </View>

        <View style={list.column}>
          <View style={list.titleRow}>
            <Text style={list.title}>
              {gig.title}
            </Text>
            <Text style={list.distance}>
              {'900'}{'m'}
            </Text>
          </View>

          <Text style={list.subTitle}>
            {gig.releaseYear}
          </Text>

          <Text style={list.description} numberOfLines={3}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.'}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  rowPressed(gig) {
    if(gig) {
      this.props.navigator.push({
        title: 'ListDetail',
        index: 2,
        data: {concert: gig}
      });
    }
  }

	render() {
		const { concerts, filter } = this.props;

		// Use the dataSource
    const rows = this.dataSource.cloneWithRows(concerts || []);
		return (
      <View style={list.container}>
        <FilterBar filter={filter} />
        <ListView
          style={list.list}
          dataSource={rows}
          renderRow={this.renderRow}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={list.separator} />}
        />
      </View>
		)
	}
}

ConcertList.propTypes = {
  concerts: PropTypes.array.isRequired,
};
