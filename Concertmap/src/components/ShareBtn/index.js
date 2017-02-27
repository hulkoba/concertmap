import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { style } from './shareBtn';

const ShareBtn = () => (
  <TouchableHighlight >
    <View style={style.ShareText} >
      <MaterialIcons name="share" style={style.shareIcon} />
      <Text style={style.shareIcon}>Teilen</Text>
    </View>
  </TouchableHighlight>
)

export default ShareBtn;
