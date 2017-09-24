import React, { Component, PropTypes } from 'react';
import { Navigator, ListView, View, Image } from 'react-native';

import { songkickLogo } from '../../config/images';

import Detail from '../Detail';
import Row from '../Row';
import { list } from './listStyles';

// Row comparison function
const rowHasChanged = (r1, r2) => {
  alert(JSON.stringify(r1));
  return r1 !== r2
};

// DataSource template object
const ds = new ListView.DataSource({ rowHasChanged });

export default class ConcertList extends Component {

  constructor(props) {
    super(props);
    this.dataSource = ds;
  }

  renderFooter = () => (
    <View style={list.skImageView}>
      <Image style={list.sklogo} source={songkickLogo} />
    </View>
  )

  renderRow = (gig) => (
    <Row gig={gig} onRowPressed={this.handleRowPressed.bind(this, gig)} />
  )

  handleRowPressed(concert) {
    this.props.navigator.push({
      title: 'Detail',
      index: 2,
      passProps: concert
    });
  }

  render() {
    const { concerts } = this.props;
    // Use the dataSource
    const rows = this.dataSource.cloneWithRows(concerts || []);
    return (
      <View style={list.container}>
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
