import React, { Component, PropTypes } from 'react';
import { Navigator, TouchableHighlight, ListView, View, Text, Image } from 'react-native';

import images from '../../config/images';
import { fonts } from '../../config/styles';

import FilterBar from '../FilterBar';
import Detail from '../Detail';
import { list } from './listStyles';


// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged});

export default class ConcertList extends Component {

	 constructor (props) {
    super(props);
    this.dataSource = ds;
  }

  renderFooter = () => (
    <View style={list.skImageView}>
      <Image style={list.sklogo} source={images.songkickLogo} />
    </View>
  )

	renderRow = (gig) => (
    <TouchableHighlight
			onPress={() => this.rowPressed(gig)}
      underlayColor='#008bae'>
      <View style={list.row}>
        <View style={list.imageView}>
          <Image style={list.image}
            source={images.pugtato} />
        </View>

        <View style={list.column}>
          <View style={list.titleRow}>
            <Text style={fonts.title}>
              {gig.title}
            </Text>
            <Text style={fonts.info}>
              {'900'}{'m'}
            </Text>
          </View>

          <Text style={fonts.subTitle}>
            {gig.releaseYear}
          </Text>

          <Text style={fonts.description} numberOfLines={2}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim juto, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. '}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  rowPressed(concert) {
    this.props.navigator.push({
      title: 'Detail',
      index: 2,
      data: concert
    });
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
          renderFooter={this.renderFooter}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={list.separator} />}
        />
      </View>
		)
	}
}

ConcertList.propTypes = {
  concerts: PropTypes.array.isRequired,
};
