import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, ListView, View, Text, Image } from 'react-native';

import ActiveFilter from './ActiveFilter';
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
    <TouchableHighlight onPress={() => this.rowPressed(gig)}
      underlayColor='#dddddd'>
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
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. '}
          </Text>
        </View>

      </View>
    </TouchableHighlight>
  )


  rowPressed(gig) {
   // var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

      alert(gig.title);
   /* this.props.navigator.push({
      title: gig.title,
      component: DetailList,
      passProps: {concert: gig}
    });*/
  }

	render() {
		const { concerts, filter } = this.props;

		// Use the dataSource
    const rows = this.dataSource.cloneWithRows(concerts || []);
		return (
      <View style={list.container}>
        <ActiveFilter filter={filter} />
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