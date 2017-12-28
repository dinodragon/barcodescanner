
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';

import Camera from 'react-native-camera';

export default class Scanner extends Component{
  constructor(props){
    super(props);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.scanned = false;

    AsyncStorage.setItem('scanner-screen-key', props.navigation.state.key);
  }

  onBarCodeRead(data){
    if(this.scanned) return;

    this.scanned = true;
    this.props.navigation.navigate('AssetSummary', data);

    // delay 5 seconds until the next scan. to prevent spoofing.
    setTimeout(() => this.scanned = false, 5000);
  }

  render(){
    return(
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam }}
	        onBarCodeRead={this.onBarCodeRead}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414141',
  },

  preview: {
    width: 300,
    height: 400
  }
});
