
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      faCode: null
    };

    this.onScan = this.onScan.bind(this);
    this.onValidate = this.onValidate.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  // -----------------------------------------------------------------
  onScan(){
    this.props.navigation.navigate("Scanner");
  }

  // -----------------------------------------------------------------
  async onSearch(){
    let resp = await Api.get(`api/Assets/${this.state.faCode}`);
    if(!resp.ok) {
      if(resp.status == 404)
        alert(`The asset's faCode ${this.state.faCode} is not found.`);
      return;
    }
    
    let detail = await resp.json();
    let data = `${this.state.faCode}#${detail.FA_Group_Code}#${detail.CreateDate.split('T')[0]}#${detail.Location}`;
    this.setState({faCode: null});
    this.props.navigation.navigate('AssetSummary', {data: data});
  }

  // -----------------------------------------------------------------
  onValidate(){
    this.props.navigation.navigate("AssetValidation");
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
          <View style={styles.qrPanel}>
            <TouchableNativeFeedback onPress={this.onScan}>
              <IonIcon name="ios-qr-scanner" size={75} color="#414141" style={{textAlign: 'center'}}/>
            </TouchableNativeFeedback>
            <TextBox style={styles.fakeTextBox} name="faCode" onChangeText={this.onChangeText} placeholder="Fa Code" />
            <TouchableNativeFeedback onPress={this.onSearch}>
              <Icon name="search" size={35} color="#414141" style={{textAlign: 'center'}}/>
            </TouchableNativeFeedback>
          </View>

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
