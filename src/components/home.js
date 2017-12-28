
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';

export default class Home extends Component{
  constructor(props){
    super(props);

    this.onScan = this.onScan.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onScan(){
    this.props.navigation.navigate("Scanner");
  }

  onValidate(){
    this.props.navigation.navigate("AssetValidation");
  }

  render(){
    return(
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={this.onScan}>
          <View style={styles.qrPanel}>
            <IonIcon name="ios-qr-scanner" size={75} color="#414141" style={{textAlign: 'center'}}/>
            <View style={styles.fakeTextBox}/>
            <Icon name="search" size={35} color="#414141" style={{textAlign: 'center'}}/>
          </View>
        </TouchableNativeFeedback>

        <View style={styles.buttonPanel}>
          <Button label="ASSET VALIDATION" onPress={this.onValidate} style={styles.validateButton}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },

  qrPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 20
  },

  fakeTextBox: {
    marginHorizontal: 10, 
    flex: 1,
    height: 40,
    borderColor: '#414141',
    borderWidth: 1,
    borderRadius: 4
  },

  buttonPanel: {
    alignItems: 'center'
  },

  validateButton: {
    backgroundColor: '#414141',
    width: 250
  }
});
