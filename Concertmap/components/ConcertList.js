import React, { Component, PropTypes } from 'react';
import { ListView, View, Text, Image } from 'react-native';

import ConcertBar from './ConcertBar';
import { listStyles } from '../styles/listStyles';

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id;

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged});

export default class ConcertList extends Component {

	 constructor (props) {
    super(props);   
    this.dataSource = ds;
  }

	static get defaultProps() {
		return { title: 'List' };
	}

	renderRow = (concerts) => {
    return (
      <View style={listStyles.row}>
        <View style={listStyles.imageView}>
          <Image style={listStyles.image}
            source={require('../img/pugtato.png')} />
        </View>

        <View style={listStyles.column}>
          <View style={listStyles.titleRow} numberOfLines={1}>
            <Text style={listStyles.title}>
              {concerts.title}              
            </Text>
            <Text style={listStyles.distance}>
              {'900'}{'m'}
            </Text>        
          </View>
          
        
          <Text style={listStyles.subTitle} numberOfLines={1}>
            {concerts.releaseYear}
          </Text>      
        
          <Text style={listStyles.description} numberOfLines={3}>
            {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. '}
          </Text>
        </View>
       
      </View>
    )
  }

	render() {
		const { concerts } = this.props;
    const filter = ['wer', 'ist', 'hier'];
		// Use the dataSource
    const rows = this.dataSource.cloneWithRows(concerts || []);
		return (      
			<ListView
				dataSource={rows}
				renderRow={this.renderRow}
			/> 
		)
	}
}

ConcertList.propTypes = {
  concerts: PropTypes.array.isRequired,
};