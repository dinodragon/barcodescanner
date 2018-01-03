
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class Setting extends Component{
  constructor(props){
    super(props);

    this.state = {
      host: null,
      port: null
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // -----------------------------------------------------------------
  async componentWillMount(){
    let host = await AsyncStorage.getItem('host');
    let port = await AsyncStorage.getItem('port');
    this.setState({host: host, port: port});
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  async onSave(){
    await AsyncStorage.setItem('host', this.state.host || "");
    await AsyncStorage.setItem('port', this.state.port || "");

    Api.resetHost();
    this.props.navigation.goBack();
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
        <Icon name="cog" size={150} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please enter the API details</Text>

        <View style={styles.textboxContainer}>
          <Text style={styles.label}>HOST</Text>
          <TextBox name="host" onChangeText={this.onChangeText} placeholder="Host" value={this.state.host}/>
        </View>

        <View style={styles.textboxContainer}>
          <Text style={styles.label}>PORT</Text>
          <TextBox name="port" onChangeText={this.onChangeText} placeholder="Port" value={this.state.port}/>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="SAVE" onPress={this.onSave} style={styles.saveButton}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  }
});