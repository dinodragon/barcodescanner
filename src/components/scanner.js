
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Camera from 'react-native-camera';

import ScannerBase from './scannerBase';

export default class Scanner extends Component{
  constructor(props){
    super(props);

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    AsyncStorage.setItem('scanner-screen-key', props.navigation.state.key);
  }

  onBarCodeRead(data){
    this.props.navigation.navigate('AssetSummary', data);
  }

  render(){
    return <ScannerBase onBarCodeRead={this.onBarCodeRead}/>
  }
}
