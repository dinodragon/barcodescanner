
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class AssetValidation extends Component{
  constructor(props){
    super(props);

    this.state = {
      validationId: null,
      errorMessage: null
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {errorMessage: null};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  async onSave(){
    if(!this.state.validationId){
      this.setState({errorMessage: 'Please enter the Validation ID to proceed.'});
      return;
    }

    this.setState({errorMessage: null});
    let body = {
      item: { stockTakeName: this.state.validationId }
    };

    let resp = await Api.post(`api/StockTakeMasters?item.stockTakeName=${this.state.validationId}`);
    if(!resp.ok){
      this.setState({errorMessage: 'Error happen while performing stock take. Please contact admin for support'});
      return;
    }

    let data = await resp.json();
    Object.assign(data, { validationId: this.state.validationId })
    this.props.navigation.navigate('ValidateAssets', data);
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
        <Icon name="pencil" size={100} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please enter the validation ID to begin</Text>

        <View style={styles.textboxContainer}>
          <TextBox name="validationId" onChangeText={this.onChangeText} placeholder="Validation ID"/>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="SAVE" onPress={this.onSave} style={styles.saveButton}/>
        </View>

        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },

  label: {
    color: '#414141',
    fontWeight: 'bold'
  },

  textboxContainer: {
    marginBottom: 15,
    marginHorizontal: 30
  },

  buttonPanel: {
    alignItems: 'center'
  },

  saveButton: {
    backgroundColor: '#414141'
  },

  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginHorizontal: 30
  }
});