import React, { Component, PropTypes } from 'react';
import { Navigator, TouchableHighlight, ListView, View, Text, Image } from 'react-native';
import moment from 'moment';

import images from '../../config/images';
import { fonts } from '../../config/styles';

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
            source={{uri: gig.image}} />
        </View>

        <View style={list.column}>
          <View style={list.titleRow}>
            <Text style={[fonts.title, list.title]}>
              {gig.title}
            </Text>
            <Text style={fonts.info}>
              ~{gig.distance} km
            </Text>
          </View>

          <View>
            <Text style={fonts.subTitle}>
              {gig.venue}
            </Text>
          </View>

          <View>
            <Text style={fonts.info}>
              {gig.time}
            </Text>
          </View>
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
        <ListView
          style={list.list}
          dataSource={rows}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={list.separator} />}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
        />
      </View>
		)
	}
}

ConcertList.propTypes = {
  concerts: PropTypes.array.isRequired,
};
