
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Camera from 'react-native-camera';

import ScannerBase from './scannerBase';

export default class ValidateAssetsScanner extends Component{
  constructor(props){
    super(props);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  onBarCodeRead(data){
    this.props.navigation.state.params.onBarCodeRead(data);
    this.props.navigation.goBack(null);
  }

  render(){
    return <ScannerBase onBarCodeRead={this.onBarCodeRead}/>
  }
}
